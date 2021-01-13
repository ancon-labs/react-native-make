"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const color_processing_1 = require("../../../services/color.processing");
const file_processing_1 = require("../../../services/file.processing");
const path_1 = require("path");
const config_1 = require("../../config");
const image_processing_1 = require("../../../services/image.processing");
const config_2 = require("./config");
exports.addAndroidSplashScreen = async (imageSource, backgroundColor) => {
    try {
        addLaunchScreenBackgroundColor(backgroundColor);
        await generateAndroidSplashImages(imageSource);
    }
    catch (err) {
        console.log(err);
    }
};
const addLaunchScreenBackgroundColor = (backgroundColor) => {
    file_processing_1.replaceInFile(path_1.join(__dirname, '../../../../templates/android/values/colors-splash.xml'), `${config_1.ANDROID_MAIN_RES_PATH}/values/colors-splash.xml`, [
        {
            oldContent: /{{splashprimary}}/g,
            newContent: `${color_processing_1.getHexColor(backgroundColor)}`,
        },
    ]);
};
const generateAndroidSplashImages = (imageSource) => Promise.all(config_2.config.androidSplashImages.map(({ size, density }) => image_processing_1.generateResizedAssets(imageSource, `${config_1.ANDROID_MAIN_RES_PATH}/drawable-${density}/splash_image.png`, size, size, {
    fit: 'inside',
})));
