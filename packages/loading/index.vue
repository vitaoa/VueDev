<template>
    <div :class="['page-loader',fixed ? 'page-loader--fixed' : false]">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="48px" height="100%" viewBox="0 0 48 60">
            <rect x="0" y="13" width="4" height="5" :fill="color">
                <animate attributeName="height" attributeType="XML" values="5;21;5" begin="0s" dur="0.6s" repeatCount="indefinite" />
                <animate attributeName="y" attributeType="XML" values="13; 5; 13" begin="0s" dur="0.6s" repeatCount="indefinite" />
            </rect>
            <rect x="10" y="13" width="4" height="5" :fill="color">
                <animate attributeName="height" attributeType="XML" values="5;21;5" begin="0.15s" dur="0.6s" repeatCount="indefinite" />
                <animate attributeName="y" attributeType="XML" values="13; 5; 13" begin="0.15s" dur="0.6s" repeatCount="indefinite" />
            </rect>
            <rect x="20" y="13" width="4" height="5" :fill="color">
                <animate attributeName="height" attributeType="XML" values="5;21;5" begin="0.3s" dur="0.6s" repeatCount="indefinite" />
                <animate attributeName="y" attributeType="XML" values="13; 5; 13" begin="0.3s" dur="0.6s" repeatCount="indefinite" />
            </rect>
            <rect x="30" y="13" width="4" height="5" :fill="color">
                <animate attributeName="height" attributeType="XML" values="5;21;5" begin="0.45s" dur="0.6s" repeatCount="indefinite" />
                <animate attributeName="y" attributeType="XML" values="13; 5; 13" begin="0.45s" dur="0.6s" repeatCount="indefinite" />
            </rect>
            <rect x="40" y="13" width="4" height="5" :fill="color">
                <animate attributeName="height" attributeType="XML" values="5;21;5" begin="0.6s" dur="0.6s" repeatCount="indefinite" />
                <animate attributeName="y" attributeType="XML" values="13; 5; 13" begin="0.6s" dur="0.6s" repeatCount="indefinite" />
            </rect>
            <text text-anchor="middle" x="20" y="45" :fill="color" style="font-size: 12px;">加载中</text>
        </svg>
    </div>
</template>
<script>
export default {
    name: 'EfLoading',
    props: {
        fixed: {
            type: Boolean
        },
        color: {
            type: String
        }
    }
}
</script>