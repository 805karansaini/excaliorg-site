/**
 * Analytics Batching Utility
 * Optimizes performance by batching analytics events and reducing call frequency
 */

interface BatchedEvent {
  eventName: string;
  eventParams: Record<string, any>;
  timestamp: number;
}

class AnalyticsBatcher {
  private batchedEvents: BatchedEvent[] = [];
  private batchTimeout: number | null = null;
  private readonly BATCH_SIZE = 10;
  private readonly BATCH_TIMEOUT = 2000; // 2 seconds
  private readonly MAX_EVENTS_PER_SESSION = 100;
  private eventsThisSession = 0;

  /**
   * Add event to batch queue
   */
  public addEvent(eventName: string, eventParams: Record<string, any> = {}): void {
    // Skip if we've reached session limit
    if (this.eventsThisSession >= this.MAX_EVENTS_PER_SESSION) {
      return;
    }

    // Skip duplicate events within short time frame
    const now = Date.now();
    const recentDuplicate = this.batchedEvents.find(
      event => event.eventName === eventName && now - event.timestamp < 1000
    );
    
    if (recentDuplicate) {
      return;
    }

    this.batchedEvents.push({
      eventName,
      eventParams: {
        ...eventParams,
        batch_id: this.generateBatchId(),
        session_event_count: this.eventsThisSession
      },
      timestamp: now
    });

    this.eventsThisSession++;

    // Send batch if we've reached the batch size
    if (this.batchedEvents.length >= this.BATCH_SIZE) {
      this.sendBatch();
    } else {
      // Reset timeout for batching
      this.resetBatchTimeout();
    }
  }

  /**
   * Send batched events immediately
   */
  public sendBatch(): void {
    if (this.batchedEvents.length === 0) return;

    // Check if gtag is available (might be deferred)
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      // Send events with reduced frequency
      this.batchedEvents.forEach((event, index) => {
        // Only send every other event for less critical events
        const isHighPriority = this.isHighPriorityEvent(event.eventName);
        
        if (isHighPriority || index % 2 === 0) {
          window.gtag!('event', event.eventName, {
            ...event.eventParams,
            batch_size: this.batchedEvents.length,
            is_batched: true
          });
        }
      });
    } else {
      // If gtag not available, store for later
      this.storePendingEvents();
    }

    this.batchedEvents = [];
    this.clearBatchTimeout();
  }

  /**
   * Determine if event is high priority and should always be sent
   */
  private isHighPriorityEvent(eventName: string): boolean {
    const highPriorityEvents = [
      'cta_click',
      'store_redirect',
      'page_view',
      'session_start',
      'conversion'
    ];
    
    return highPriorityEvents.includes(eventName);
  }

  /**
   * Store events for later sending when gtag becomes available
   */
  private storePendingEvents(): void {
    try {
      const existingEvents = JSON.parse(localStorage.getItem('pending_analytics') || '[]');
      const newEvents = this.batchedEvents.map(event => ({
        ...event,
        stored_at: Date.now()
      }));
      
      const allEvents = [...existingEvents, ...newEvents];
      
      // Keep only last 20 events to prevent storage bloat
      const trimmedEvents = allEvents.slice(-20);
      
      localStorage.setItem('pending_analytics', JSON.stringify(trimmedEvents));
    } catch (error) {
      console.warn('Failed to store pending analytics events:', error);
    }
  }

  /**
   * Send any stored pending events
   */
  public sendPendingEvents(): void {
    try {
      const pendingEvents = JSON.parse(localStorage.getItem('pending_analytics') || '[]');
      
      if (pendingEvents.length > 0 && typeof window !== 'undefined' && typeof window.gtag === 'function') {
        pendingEvents.forEach((event: any) => {
          // Only send events from last hour to avoid stale data
          if (Date.now() - event.stored_at < 3600000) {
            window.gtag!('event', event.eventName, {
              ...event.eventParams,
              was_pending: true
            });
          }
        });
        
        localStorage.removeItem('pending_analytics');
      }
    } catch (error) {
      console.warn('Failed to send pending analytics events:', error);
    }
  }

  /**
   * Reset batch timeout
   */
  private resetBatchTimeout(): void {
    this.clearBatchTimeout();
    this.batchTimeout = setTimeout(() => {
      this.sendBatch();
    }, this.BATCH_TIMEOUT);
  }

  /**
   * Clear batch timeout
   */
  private clearBatchTimeout(): void {
    if (this.batchTimeout) {
      clearTimeout(this.batchTimeout);
      this.batchTimeout = null;
    }
  }

  /**
   * Generate unique batch ID
   */
  private generateBatchId(): string {
    return `batch_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Clean up resources
   */
  public destroy(): void {
    this.sendBatch(); // Send any remaining events
    this.clearBatchTimeout();
  }
}

// Create singleton instance
export const analyticsBatcher = new AnalyticsBatcher();

// Send pending events when gtag becomes available
if (typeof window !== 'undefined') {
  // Check periodically for gtag availability
  const checkGtag = () => {
    if (window.gtag) {
      analyticsBatcher.sendPendingEvents();
    } else {
      setTimeout(checkGtag, 1000);
    }
  };
  
  checkGtag();
  
  // Clean up on page unload
  window.addEventListener('beforeunload', () => {
    analyticsBatcher.destroy();
  });
}

// Export for manual use
export default analyticsBatcher;