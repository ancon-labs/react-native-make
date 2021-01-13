"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const service_1 = require("../../../services/ios/service");
const image_processing_1 = require("../../../services/image.processing");
const config_1 = require("./config");
exports.addIosSplashScreen = async (imageSource, backgroundColor, resizeMode) => {
    try {
        const iosSplashImageFolder = service_1.addIosImageSetContents('SplashImage', service_1.EImageSetType.IMAGE);
        await generateIosSplashImages(imageSource, iosSplashImageFolder);
        // generateStoryboardFile(backgroundColor, resizeMode);
        // setNewSplashScreenFileRefInInfoPlist();
    }
    catch (err) {
        console.log(err);
    }
};
// const generateStoryboardFile = (backgroundColor: string, resizeMode: EResizeMode) => {
//   const { red, green, blue, alpha } = getNormalizedRGBAColors(backgroundColor);
//   replaceInFile(
//     join(__dirname, `../../../../templates/ios/SplashScreen.${resizeMode}.storyboard`),
//     `./ios/${config.iosStoryboardName}.storyboard`,
//     [
//       {
//         oldContent: /<color.*key="backgroundColor".*\/>/g,
//         newContent: `<color key="backgroundColor" red="${red}" green="${green}" blue="${blue}" alpha="${alpha}" colorSpace="custom" customColorSpace="sRGB"/>`,
//       },
//     ]
//   );
// };
// const setNewSplashScreenFileRefInInfoPlist = () => {
//   const infoPlistPath = `./ios/${getIosPackageName()}/Info.plist`;
//   const UILaunchStoryboardNamePattern = /(<key>UILaunchStoryboardName<\/key>[ \t\n]*<string>)[a-zA-Z]+(<\/string>)/g;
//   replaceInFile(infoPlistPath, infoPlistPath, [
//     {
//       oldContent: UILaunchStoryboardNamePattern,
//       newContent: `$1${config.iosStoryboardName}$2`,
//     },
//   ]);
// };
const generateIosSplashImages = (imageSource, iosSplashImageFolder) => {
    const { multipliers, size } = config_1.config.iosSplashImage;
    return Promise.all(multipliers.map(multiplier => image_processing_1.generateResizedAssets(imageSource, `${iosSplashImageFolder}/splash@${multiplier}x.png`, size * multiplier, size * multiplier, {
        fit: 'inside',
    })));
};
