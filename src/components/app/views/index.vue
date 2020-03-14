<template>
    <div class="m-banner">
        <Slider ref="slider" :options="sliderOptions">
            <!-- slideritem wrapped package with the components you need -->
            <SliderItem v-for="(item,index) in bannerData" :key="index" :style="item.style" @click.native="jumpLink(item)" :title="item.title"></SliderItem>
            <!-- Customizable loading -->
            <div slot="loading">loading...</div>
        </Slider>
    </div>
</template>
<script>
import Slider from '@/components/app/Slider'
import SliderItem from '@/components/app/SliderItem'
export default {
    props: ["sliderOptions", "bannerData"],
    components: {
        Slider,
        SliderItem
    },
    methods: {
        jumpLink(obj) {
            $.emit(jumpLink, obj)
        }
    }
}
</script>