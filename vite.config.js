import {defineConfig} from "vite";

export default defineConfig(({ command, mode }) => {
    return {
        build: {
            lib: {
                entry: './src/main.ts', // 라이브러리의 진입점
                name: 'HyungjuLeeUi', // 글로벌 변수로 접근할 때 사용될 이름
                fileName: (format) => `hyungju-lee-ui.${format}.js`
            },
            // rollupOptions: {
            //     여기에 외부화(externalize)할 모듈을 지정하거나 기타 Rollup 옵션을 추가할 수 있습니다.
            // }
        }
    }
})
