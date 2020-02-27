#  APP Project

## Project files:
1. yarn add -D typescript
1. yarn add -D @types/react @types/react-native
1. add tsconfig.json     


```js
{
  "compilerOptions": {
    "baseUrl": "src",
    // "outDir": "./lib",
    "rootDir": "./",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "allowSyntheticDefaultImports": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "jsx": "react-native",
    "lib": [
      "es2017",
      "es2018"
    ],
    "module": "es2015",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "noImplicitAny": false,
    "skipLibCheck": true,
    "sourceMap": true,
    "strict": true,
    "target": "es2017",
  },
  "include": [
    "src/**/*.ts",
    "src/**/*.tsx"
  ],
  "exclude": [
    "node_modules",
    "**/*.test.tsx",
    "**/*.spec.ts"
  ],
}
```


## Project files: react-native-config +.env.* + Android 
1. please check this link
https://github.com/luggit/react-native-config

## Project files: react-native-config +.env.* +IOS 
1. please check this link
 https://github.com/luggit/react-native-config#advanced-android-setup

// start 
 iOS
Read variables declared in .env from your Obj-C classes like:
// import header
**************
// end  Different environments
1. please check this link
https://github.com/luggit/react-native-config#ios-multi-scheme
// start iOS
// end   Troubleshooting


## Support  1:  I18n  Done !!!
## Support  2:  JPush Done !!!
## Support  3:  TypeScript Components  Done !!!
## Support  4:  Module Resolver  Done !!!

## #####Coming Soon##### ## 
## Support 5:   Chat
## Support 6:   share to Social  wechat whatApp ,linkin,facebook
## Support 7:   AppLink
## Support 8:   upgrade version
## Support 9:  login ,logout ,forgot password, setting 



