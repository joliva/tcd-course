SDK = --sdk 3.1.2.GA
LOG_LEVEL = --log-level info
OPTS = $(SDK) $(LOG_LEVEL)

ANDROID_OPT = --platform android
ANDROID_SIM_OPT  = $(ANDROID_OPT) --target emulator
ANDROID_SIM_OPT += --avd-id 6
ANDROID_SIM_OPT += --avd-skin WVGA854

IPHONE_OPT  =  --platform ios
IPHONE_SIM_OPT  = $(IPHONE_OPT) --deploy-type development
IPHONE_SIM_OPT += --device-family iphone
IPHONE_SIM_OPT += --ios-version 6.1
IPHONE_SIM_OPT += --sim-type iphone
IPHONE_SIM_OPT += --sim-version 6.1

and-sim:
	titanium build $(OPTS) $(ANDROID_SIM_OPT)

iph-sim:
	titanium build $(OPTS) $(IPHONE_SIM_OPT)
