function isCustomEvent(event: Event): event is CustomEvent {
  return 'detail' in event;
}

interface CLICK_VALUE_EVENT_TYPE extends Event {
  detail: {
    data: unknown
  }
}

function isClickValueEvent(event: Event): event is CLICK_VALUE_EVENT_TYPE {
  if (!isCustomEvent(event)) {
    return false;
  }
  return 'detail' in event && 'index' in event.detail;
}

function isDropdownValueObject(data: unknown): data is { label: string; value: unknown } {
  return (data as any).label !== undefined && (data as any).value !== undefined;
}

export {
  isCustomEvent,
  isClickValueEvent,
  isDropdownValueObject,
}
