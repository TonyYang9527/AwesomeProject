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