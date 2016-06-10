Files:
===
* libcocos2d iOS.a
* libjscocos2d iOS.a

Generated from the cocos2d-x 3.9's source code. Merged the Release iPhone OS and Release iPhone Simulator libraries.



Sample commands:
===
View the library info(architectures):

	lipo -info libPrint.a

Merge the libraries with different architectures:

	lipo -create ./Debug-iphonesimulator/libCocosDenshion\ iOS.a  ./Debug-iphoneos/libCocosDenshion\ iOS.a  -output $OUTPUTDIR_PATH/libCocosDenshion\ iOS.a



Ref:
===
http://my.oschina.net/ioslighter/blog/362199?fromerr=Tl9wl2Z5