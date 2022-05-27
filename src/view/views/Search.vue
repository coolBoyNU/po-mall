<template >
  <div >
    <van-popup @click-overlay="onOverlag" v-model="show" position="top" :style="{ height: '50%' }" >
      <form >
        <van-search
          v-model="value"
          show-action
          placeholder="请输入搜索关键词"
          @search="onSearch"
          @cancel="$router.back()"
        />
      </form >
      <div class="box" >
        <div class="search-history" v-if="historyCenter.length>0" >
          <div class="nav-search-header" >
            <div class="history-left" >搜索历史</div >
            <div class="history-right" >
              <van-icon name="delete-o" />
            </div >
          </div >
          <div class="nav-history-content" >
            <span v-for="(item,index) in historyCenter" :key="index"
                  @click="$router.push('/searchresult/'+item)" >{{ item }}</span >
          </div >
        </div >
        <van-divider />
        <div class="search-hot" >
          <div class="nav-hot-header" >
            <div class="hot-left" >热门搜索</div >
            <div class="hot-right" >
              <van-icon @click="hotState" :name="[hotIsShow?'eye-o':'closed-eye']" />
            </div >
          </div >
          <div v-if="hotIsShow" class="nav-hot-content" >
            <span v-for="(item,index) in hotsData" :key="index"
                  @click="$router.push('/searchresult/'+item)" >{{ item }}</span >
          </div >
          <div v-else class="isShow" >内容已隐藏</div >
        </div >
      </div >
    </van-popup >
  </div >
</template >

<script >
  let historyCenter = JSON.parse(localStorage.getItem('searchCenter') || '[]')

  export default {
    name: "Search",
    data() {
      return {
        show: true,
        value: '',
        hotIsShow: true,
        historyCenter,
        hotsData: [ '电视', 'DVD', '小米' ],
      }
    },
    methods: {
      onOverlag() {
        //点击遮罩触发
        this.$router.back()
      },
      hotState() {
        //点击小眼睛
        this.hotIsShow = !this.hotIsShow
      },
      onSearch() {
        //搜索
        //输入的值本地已有就 去重
        if (this.historyCenter.includes(this.value)) {
          return;
        }
        this.historyCenter.push(this.value)
        //保存到本地
        localStorage.setItem('searchCenter', JSON.stringify(this.historyCenter))
        this.$router.push('/searchresult/' + this.value)
      }
    }
  }
</script >

<style lang="scss" scoped >
  .box {
    padding: 10px;

    .search-history {
      .nav-search-header {
        display: flex;
        justify-content: space-between;

        .history-left {
          font-weight: bold;
          font-size: 20px;
        }
      }

      .nav-history-content {
        height: 70px;
        padding: 10px 0;

        span {
          text-align: center;
          background-color: #dadede;
          border-radius: 6px;
          padding: 3px;
          margin: 0 3px;
        }
      }

    }

    .search-hot {
      .nav-hot-header {
        display: flex;
        justify-content: space-between;

        .hot-left {
          font-weight: bold;
          font-size: 20px;
        }
      }

      .nav-hot-content {
        height: 70px;
        padding: 10px 0;

        span {
          text-align: center;
          background-color: #dadede;
          border-radius: 6px;
          padding: 3px;
          margin: 0 3px;
        }
      }

      .isShow {
        text-align: center;
        font-size: 18px;
      }
    }
  }
</style >