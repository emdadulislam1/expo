# Clear Cookies Feature Implementation Summary

This document summarizes all the changes made to implement the `clearCookies` feature in React Native WebView.

## Files Modified

### 1. TypeScript Types
**File:** `src/WebViewTypes.ts`
- Added `'clearCookies'` to the `WebViewCommands` type union

### 2. Android Implementation
**File:** `android/src/main/java/com/reactnativecommunity/webview/RNCWebViewManagerImpl.kt`
- Added `COMMAND_CLEAR_COOKIES = 1003` constant
- Added `"clearCookies"` to the commands map
- Added implementation in `receiveCommand` method using `CookieManager.removeAllCookies()` and `CookieManager.flush()`

**File:** `src/WebView.android.tsx`
- Added `clearCookies` method to the `useImperativeHandle` hook

### 3. iOS Implementation
**File:** `apple/RNCWebViewImpl.m`
- Added `clearCookies` method that handles both iOS 11+ (using `WKHTTPCookieStore`) and older versions (using `NSHTTPCookieStorage`)

**File:** `src/WebView.ios.tsx`
- Added `clearCookies` method to the `useImperativeHandle` hook

### 4. macOS Implementation
**File:** `src/WebView.macos.tsx`
- Added `clearCookies` method to the `useImperativeHandle` hook (uses same native implementation as iOS)

### 5. Windows Implementation
**File:** `windows/ReactNativeWebView/ReactWebView2Manager.cpp`
- Added `"clearCookies"` to the commands list
- Added implementation in `DispatchCommand` method using `CoreWebView2.CookieManager.DeleteAllCookies()`

**File:** `src/WebView.windows.tsx`
- Added `"clearCookies"` to the supported commands list
- Added `clearCookies` method to the `useImperativeHandle` hook

## New Files Created

### Documentation
**File:** `CLEAR_COOKIES_FEATURE.md`
- Comprehensive documentation for the new feature including usage examples, platform support, and implementation details

**File:** `CHANGES_SUMMARY.md`
- This summary document

## Feature Overview

The `clearCookies` feature provides a consistent API across all platforms to clear all cookies from a WebView instance. The implementation:

1. **Follows existing patterns** - Uses the same command structure as `clearCache` and `clearHistory`
2. **Platform-specific implementations** - Each platform uses its native cookie management APIs
3. **Backward compatibility** - iOS implementation includes fallback for older iOS versions
4. **Type safety** - Properly typed in TypeScript
5. **Consistent API** - Same method signature across all platforms

## Usage

```javascript
// Get a ref to the WebView
const webViewRef = useRef(null);

// Clear cookies
webViewRef.current.clearCookies();
```

## Testing

The feature can be tested by:
1. Loading a website that sets cookies
2. Calling `webViewRef.current.clearCookies()`
3. Verifying that cookies are cleared (e.g., by checking browser developer tools or reloading the page)

## Platform Support

- ✅ Android (API level 21+)
- ✅ iOS (iOS 8+)
- ✅ macOS (macOS 10.10+)
- ✅ Windows (Windows 10+ with WebView2)