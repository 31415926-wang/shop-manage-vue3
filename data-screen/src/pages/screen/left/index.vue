<template>
    <div class="chart1">
        <div class="chart1-row1">
            <div class="text-font">实时入库统计</div>
            <img src="@/assets/images/screen/dataScreen-title.png" alt="">

            <span class="mountText text-font">
                今天预计入库 <span class="num">{{ touristMonut }}</span> 趟
            </span>
        </div>

        <div class="chart1-row2">

            <span class="mathBlock flex-center-x-y" v-for="(item, index) in peopleMonutStr" :key="index">{{ item }}</span>

        </div>

        <div class="chart1-row3">
            <waterBall></waterBall>
        </div>
    </div>

    <div class="chart2">

        <div class="chart2-row1">
            <div class="text-font">防控人员比例</div>
            <img src="@/assets/images/screen/dataScreen-title.png" alt="">
        </div>

        <div class="chart2-row2 flex-center-x-y">
            <div class="sex-box sex-box1 man-box flex-center-x-y"><img src="@/assets/images/screen/man.png" alt=""></div>
            <div class="sex-box sex-box2 flex-center-x-y"><img src="@/assets/images/screen/woman.png" alt=""></div>
        </div>
 
        <div class="chart2-row3 text-font">
            <!-- <div class="rate">
            <span>男生{{handleSale(manScale)}}</span>
            <span>女生{{handleSale(1-manScale)}}</span>
            </div> -->
        </div>

        <div class="chart2-row4">
                <sexRate :manRate="58"></sexRate>
        </div>

    </div>

    <div class="chart3">
        <div class="chart3-row1">
            <div class="text-font">发放类型占比</div>
            <img src="@/assets/images/screen/dataScreen-title.png" alt="">
        </div>

        <div class="chart3-row2">
            <agePie></agePie>
        </div>

    </div>
</template>

<script setup lang='ts'>
import waterBall from '@/pages/screen/left/waterBall.vue';
import sexRate from "./sexRate.vue";
import agePie from "./agePie.vue";


import { ref, onMounted, onUnmounted, watch } from "vue";
let touristMonut = ref(560);
let peopleMonut = ref(67895);
let peopleMonutStr = ref('');
let Interval = ref<any>(null);

// let manScale=ref(0.58);



onMounted(() => {
    Interval.value = setInterval(() => {
        peopleMonut.value++;
    }, 1000)
})

onUnmounted(() => {
    clearInterval(Interval.value);
    Interval.value = null;
})

//处理格式
const handleStr = (str: string, goalLength: number) => {
    let resultStr = str;

    if (str.length < goalLength) {
        for (let i = 0; i < goalLength - str.length; i++) {
            resultStr = '0' + resultStr;
        }

    }
    return resultStr
}
// const handleSale=(number:number)=>{
//     //直接四舍五入，在一定程度保证准确
//     return  Math.round((number)*100)+'%'
// }


watch(peopleMonut, () => {
    peopleMonutStr.value = handleStr(peopleMonut.value + '趟', 7);
}, { immediate: true })



</script>

<style scoped lang='scss'>
@mixin chart-bg {
    background-size: 100% 100%;
    //不让背景覆盖内边距
    background-clip: content-box;
    padding-top: 20px;
}

@mixin sex-bg{
    width: 111px;
    height: 115px;
}

.text-font {
    color: white;
    font-size: 20px;
}

.chart1 {
    //较大的背景
    background: url('@/assets/images/screen/dataScreen-main-lb.png') no-repeat;
    @include chart-bg;
    height: 40%;
    display: flex;
    flex-direction: column;

    .chart1-row1 {
        padding: 12px;
        // border: 1px solid red;
        height: 60px;
        position: relative;

        .mountText {
            position: absolute;
            bottom: 0;
            right: 0;
            padding: 12px;

            .num {
                color: yellowgreen;
            }
        }
    }

    .chart1-row2 {
        height: 52px;
        // border: 1px solid rgb(24, 185, 37);
        display: flex;
        color: #29fcff;
        font-size: 20px;
        padding: 0 13px;


        .mathBlock {
            flex-grow: 1;
            background: url(@/assets/images/screen/total.png) no-repeat;
            background-size: 100% 100%;
            transition: all 1s;
        }
    }

    .chart1-row3 {
        // border: 1px solid rgb(231, 75, 13);
        flex-grow: 1;

    }
}

.chart2 {
    height: 30%;
    background: url('@/assets/images/screen/dataScreen-main-cb.png') no-repeat;
    @include chart-bg;
    display: flex;
    flex-direction: column;

    .chart2-row1 {
        height: 45px;
        padding: 5px;
        // border: 1px solid rgb(231, 75, 13);
    }

    .chart2-row2 {
        height: 125px;
        // border: 1px solid rgb(231, 75, 13);
        display: flex;

        .sex-box{
            @include sex-bg;
        }
        .sex-box1{
            background: url('@/assets/images/screen/man-bg.png');
        }
        .sex-box2{
            background: url('@/assets/images/screen/woman-bg.png');
        }

        .man-box{
            margin-right: 30px;
        }
    }

    .chart2-row3 {
        // border: 1px solid rgb(231, 75, 13);
        padding: 5px 2px ;

        .rate{
            font-size: 18px;
            display: flex;
        justify-content: space-between;
            
        }
      
    }

    .chart2-row4{
        padding-top: 10px;
        flex-grow: 1;
        // border: 1px solid rgb(231, 75, 13);
    }


}

.chart3 {
    height: 30%;
    background: url('@/assets/images/screen/dataScreen-main-cb.png') no-repeat;
    @include chart-bg;
    display: flex;
    flex-direction: column;

    .chart3-row1{
        padding: 5px;
        padding-top: 7px;
        padding-bottom: 0;

    }

    .chart3-row2{
        flex-grow: 1;
        padding: 8px 0;
    }

}
</style>

