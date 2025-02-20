package com.webseeder.matrimonialapp

import android.app.Activity
import android.view.WindowManager

object SecureFlagHelper {
    fun applySecureFlag(activity: Activity) {
        activity.window.setFlags(
            WindowManager.LayoutParams.FLAG_SECURE,
            WindowManager.LayoutParams.FLAG_SECURE
        )
    }

    fun removeSecureFlag(activity: Activity) {
        activity.window.clearFlags(WindowManager.LayoutParams.FLAG_SECURE)
    }
}
