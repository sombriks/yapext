import { AdMob, AdmobConsentStatus, BannerAdPosition, BannerAdSize } from '@capacitor-community/admob';

export async function initializeAdMob() {

  await AdMob.initialize()

  const [trackingInfo, consentInfo] = await Promise.all([
    AdMob.trackingAuthorizationStatus(),
    AdMob.requestConsentInfo(),
  ])

  if (trackingInfo.status === 'notDetermined') {
    /**
     * If you want to explain TrackingAuthorization before showing the iOS dialog,
     * you can show the modal here.
     * ex)
     * const modal = await this.modalCtrl.create({
     *   component: RequestTrackingPage,
     * });
     * await modal.present();
     * await modal.onDidDismiss();  // Wait for close modal
     **/

    await AdMob.requestTrackingAuthorization()
  }


  const authorizationStatus = await AdMob.trackingAuthorizationStatus()
  if (
    authorizationStatus.status === 'authorized' &&
    consentInfo.isConsentFormAvailable &&
    consentInfo.status === AdmobConsentStatus.REQUIRED
  ) {
    await AdMob.showConsentForm()
  }
}

export async function showBanner() {
  const options = {
    adId: import.meta.env.VITE_ADMOB_BANNER_ID,
    adSize: BannerAdSize.ADAPTIVE_BANNER,
    position: BannerAdPosition.BOTTOM_CENTER,
    margin: 0,
    isTesting: import.meta.env.VITE_ADMOB_BANNER_TESTING
    // npa: true
  }
  await AdMob.showBanner(options)
}
