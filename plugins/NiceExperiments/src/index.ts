export const onLoad = () => {
 
vendetta.metro.findByProps("ChatListAnimationExperiment").ChatListAnimationExperiment.getCurrentConfig().shouldAnimateAndroid = true;
vendetta.metro.findByProps("MultiAccountMobileExperiment").MultiAccountMobileExperiment.getCurrentConfig().isMultiAccountMobileEnabled = true;
vendetta.metro.findByProps("useIOSDiscoveryExperiment").default.getCurrentConfig().showDiscovery = true;

}
