<template>
  <div id="hy-swiper">
    <div class="swiper" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
      <slot></slot>
    </div>
    <slot name="indicator"></slot>
    <div class="indicator">
      <slot name="indicator" v-if="showIndicator && slideCount >1">
        <div v-for="(item,index) in slideCount" class="indi-item" :class="{active:index ===currentIndex-1}" :key="index">
        </div>
      </slot>>
    </div>
     
  </div>
</template>

<script>
// import func from '../../../../vue-temp/vue-editor-bridge';
  export default {
    name: "Swiper",
    props: {
      //默认的间隔时间
      interval: {
        type: Number,
        default: 3000
      },
      //动画时间
      animUdration: {
        type: Number,
        default: 300
      },
      //动画速度
      moveRatio: {
        type: Number,
        default: 0.25
      },
      //是否现实羡慕的滚动按钮
      showIndicator: {
        type: Boolean,
        default: true
      }
    },
    data: function (){
      return {
        slideCount: 0,//总共有多少张图
        totalWidth: 0,//整个swiper的宽度
        swiperStyle: {},//swiper的仰视
        currentIndex:1,//当前的index
        scrolling:false,//是否正在滚动
      }
    },
    mounted: function (){
      //1.操作DOM, 在前后添加Slide
      setTimeout(() => {
        this.handleDom();

        //2.开启定时器
        this.startTimer();
      },100)
    },
    methods: {
       /**
       * 设置滚动的位置
       */
      setTransform: function (position) {
        this.swiperStyle.transform = `translate3d(${position}px, 0, 0)`;
        this.swiperStyle['-webkit-transform'] = `translate3d(${position}px), 0, 0`;
        this.swiperStyle['-ms-transform'] = `translate3d(${position}px), 0, 0`;
      },
      /**
       * 校验正确的位置
       */
      checkPosition: function () {
        window.setTimeout(() =>{
          //1.校验正确的位置
          this.swiperStyle.transition = '0ms';
          if (this.currentIndex >= this.slideCount +1) {
            this.currentIndex = 1;
          }else if (this.currentIndex <= 0) {
            this.currentIndex = this.slideCount;            
          }
          this.setTransform(-this.currentIndex * this.totalWidth);

          //2.结束移动后的回调
          this.$emit('transitionEnd',this.currentIndex-1);
        },this.animUdration)

      },
      /**
       * 滚动到正确的位置
       */
      scrollContent: function (currentPosition) {
        //0.设置状态为正在滚动
        this.scrolling = true;

        //1.开始滚动动画
        this.swiperStyle.transition ='transform' +this.animUdration + 'ms';
        this.setTransform(currentPosition);

        //2.判断滚动到的位置
        this.che
      },
      /**
       * 定时器操作
       */
      startTimer: function() {
        this.playTimer = window.setInterval(() =>{
          this.currentIndex++;

          this.scrollContent(-this.currentIndex *this.totalWidth);
        },this.interval)
      },
      /**
       * 关闭定时器
       */
      stopTimer: function(){
        window.clearInterval(this.playTimer);
      },
      /**
       * 操作DOM，在DOM前后添加Slide
       */
      handleDom: function () {
        //1.获取要操作的元素
        let swiperEl = document.querySelector('.swiper');
        let slidesEls = swiperEl.getElementsByClassName('slide');

        //2.保存个数
        this.slideCount = slidesEls.length;

        //3.如果大于1个 ，那么在前后分别添加一个slide
        if (this.slideCount >1) {
          let cloneFirst = slidesEls[0].cloneNode(true);
          let cloneLast = slidesEls[this.slideCount -1].cloneNode(true);
          swiperEl.insertBefore(cloneLast,slidesEls[0]);
          swiperEl.appendChild(cloneFirst);
          this.totalWidth = swiperEl.offestWidth;
          this.swiperStyle = swiperEl.style;
        }

        //4.让swiper元素，显示第一个(目前是显示前面添加的最后一个元素)
        this.setTransform(-this.totalWidth);
      },
      /**
       * 拖动事件的处理
       */
      touchStart: function (e){
        //1.如果正在滚动，不可以拖动
        if (this.scrolling) return;

        //2.停止定时器
        this.stopTimer();

        //3.保存开始滚动的位置
        this.startX = e.touches[0].pageX;
      },
      touchMove: function (e){
        //1.计算出用户拖动的距离
        this.currentX = e.touches[0].pageX;
        this.distance = this.currentX - this.startX;
        let currentPosition = -this.currentIndex * this.totalWidth;
        let moveDistance = this.distance +currentPosition;

        //2.设置当前的位置
        this.setTransform(moveDistance);
      },

      touchEnd: function () {
        //1.获取移动的距离
        let currentMove = Math.abs(this.distance);

        //2.判断最终的距离
        if (this.distance === 0) {
          return;
          //右边移动超过0.5
        }else if (this.distance >0 && currentMove > this.totalWidth * this.moveRatio) {
          this.currentIndex --
          //向左边移动超过0.5
        }else if (this.distance <0 && currentMove > this.totalWidth * this.moveRatio) {
          this.currentIndex ++
        }

        //3.移动到正确的位置
        this.scrollContent(-this.currentIndex * this.totalWidth);

        //4.完成移动后，重新开启定时器
        this.startTimer();

      },

      changeItem: function () {
        //1.移除定时器
        this.stopTimer();

        //2.修改index和位置
        this.currentIndex += num;
        this.scrollContent (- this.currentIndex * this.totalWidth);

        //3.开启定时器
        this.startTimer();
      },
      /**
       * 控制上一个, 下一个
       */
      previous: function () {
        this.changeItem(-1);
      },
      next: function () {
        this.changeItem(1);
      }
    }
  }


</script>

<style  scoped>
#hy-swiper {
  overflow: hidden;
  position: relative;
}

.swiper {
  display: flex;
}

.indicator {
  display: flex;
  justify-content: center;
  position: absolute;
  width: 100%;
  bottom: 8px;
}

.indi-item {
  box-sizing: border-box;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: #fff;
  line-height: 8px;
  text-align: center;
  font-size: 12px;
  margin: 0 5px;

}
.indi-item.active{
  background-color: rgba(212,62,46,1.0);
}
</style>