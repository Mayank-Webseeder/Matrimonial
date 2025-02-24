package com.webseeder.matrimonialapp

import android.os.Bundle
import android.content.Context
import android.hardware.display.DisplayManager
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

class MainActivity : ReactActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val isScreenSharing = isScreenSharingActive()

        if (!isScreenSharing) {
            SecureFlagHelper.applySecureFlag(this) // Sirf screen sharing band nahi karni hai, baaki sab band rahega
        }
    }

    override fun getMainComponentName(): String = "Matrimonial"

    override fun createReactActivityDelegate(): ReactActivityDelegate =
        DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)

    private fun isScreenSharingActive(): Boolean {
        val displayManager = getSystemService(Context.DISPLAY_SERVICE) as DisplayManager
        for (display in displayManager.displays) {
            if (display.displayId != 0) {
                return true // Screen mirroring ya screen sharing active hai
            }
        }
        return false
    }
}
