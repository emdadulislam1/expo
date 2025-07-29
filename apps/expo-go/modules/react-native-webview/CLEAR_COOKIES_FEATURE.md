# Clear Cookies Feature

This document describes the new `clearCookies` feature added to React Native WebView.

## Overview

The `clearCookies` method allows you to programmatically clear all cookies from the WebView. This is useful for privacy, testing, or when you need to reset the WebView's cookie state.

## Usage

```javascript
import React, { useRef } from 'react';
import { View, Button } from 'react-native';
import WebView from 'react-native-webview';

const MyComponent = () => {
  const webViewRef = useRef(null);

  const handleClearCookies = () => {
    if (webViewRef.current) {
      webViewRef.current.clearCookies();
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Button title="Clear Cookies" onPress={handleClearCookies} />
      <WebView
        ref={webViewRef}
        source={{ uri: 'https://example.com' }}
        style={{ flex: 1 }}
      />
    </View>
  );
};
```

## Platform Support

The `clearCookies` method is supported on all platforms:

- **Android**: Uses `CookieManager.removeAllCookies()` and `CookieManager.flush()`
- **iOS**: Uses `WKHTTPCookieStore.deleteCookie()` for iOS 11+ and `NSHTTPCookieStorage.deleteCookie()` for older versions
- **macOS**: Uses the same implementation as iOS
- **Windows**: Uses `CoreWebView2.CookieManager.DeleteAllCookies()`

## API Reference

### clearCookies()

Clears all cookies from the WebView.

**Parameters:** None

**Returns:** void

**Example:**
```javascript
webViewRef.current.clearCookies();
```

## Implementation Details

### Android
- Uses Android's `CookieManager` API
- Calls `removeAllCookies(null)` to remove all cookies
- Calls `flush()` to ensure changes are persisted

### iOS/macOS
- For iOS 11+: Uses `WKHTTPCookieStore` to get all cookies and delete them individually
- For iOS < 11: Uses `NSHTTPCookieStorage` as a fallback
- Handles both shared and private cookie stores

### Windows
- Uses WebView2's `CoreWebView2.CookieManager.DeleteAllCookies()` method
- Clears all cookies from the WebView2 instance

## Related Methods

- `clearCache(includeDiskFiles)`: Clears the WebView cache
- `clearHistory()`: Clears the WebView navigation history
- `clearFormData()`: Clears form data (Android only)

## Notes

- The method is asynchronous on some platforms but the API is synchronous for consistency
- Cookies are cleared immediately when the method is called
- This affects all cookies for all domains in the WebView
- The method is safe to call multiple times