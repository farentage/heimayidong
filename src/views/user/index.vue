<template>
  <div class="user-container">
    <!-- 导航栏 -->
    <van-nav-bar :title="user.name" left-arrow />
    <!-- /导航栏 -->

    <!-- 用户信息 -->
    <div class="user-info-container">
      <div class="row1">
        <van-image
          class="col1"
          fit="cover"
          round
          :src="user.photo"
        />
        <div class="col2">
          <div class="row1">
            <div class="item">
              <div class="count">{{ user.art_count }}</div>
              <div class="text">发布</div>
            </div>
            <div class="item">
              <div class="count">{{ user.follow_count }}</div>
              <div class="text">关注</div>
            </div>
            <div class="item">
              <div class="count">{{ user.fans_count }}</div>
              <div class="text">粉丝</div>
            </div>
            <div class="item">
              <div class="count">{{ user.like_count }}</div>
              <div class="text">获赞</div>
            </div>
          </div>
          <div class="action">
            <!-- 如果页面用户是当前登录用户，则显示编辑资料 -->
            <!-- 否则显示私信和关注 -->
            <van-button
              type="primary"
              size="small"
            >私信</van-button>
            <van-button
              type="info"
              size="small"
            >关注</van-button>
            <!-- <van-button
              type="default"
              size="small"
            >编辑资料</van-button> -->
          </div>
        </div>
      </div>
      <div class="intro-wrap">
        <div>
          <span>认证：</span>
          <span>{{ user.certi }}</span>
        </div>
        <div>
          <span>简介：</span>
          <span>{{ user.intro }}</span>
        </div>
      </div>
    </div>
    <!-- /用户信息 -->

    <!-- 文章列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="我也是有底线的"
      @load="onLoad"
    >
  <van-cell
      v-for="(acticle, index) in list"
      :key="index"
      :title="acticle.title"
  />
</van-list>
    <!-- /文章列表 -->
  </div>
</template>

<script>
import { getUserById } from '@/api/user'
import { getArticlesByUser } from '@/api/articles'
export default {
  name: 'UserPage',
  components: {},
  props: {},
  data () {
    return {
      user: {}, // 用户信息
      list: [],
      loading: false,
      finished: false,
      page: 1 // 获取下一页数据的页码
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadUser()
  },
  mounted () {},
  methods: {
    async loadUser () {
      try {
        const { data } = await getUserById(this.$route.params.userId)
        this.user = data.data
      } catch (err) {
        console.log(err)
        this.$toast('获取用户数据失败')
      }
    },
    async onLoad () {
      // 请求获取用户文章数据
      const { data } = await getArticlesByUser(this.$route.params.userId, { page: this.page, per_page: 20 })
      //   this.list.push(...data.data.results)
      console.log(data)

      // 把数据添加的列表中
      const { results } = data.data
      console.log(results)

      this.list.push(...results)
      // 加载状态结束
      this.loading = false
      // 判断数据是否全部加载完毕
      if (results.length) {
        this.page++ // 更新获取下一页数据的页码
      } else {
        this.finished = true // 没有数据了，不需要加载更多了
      }
    }
    // onLoad () {
    //   // 异步更新数据
    //   setTimeout(() => {
    //     for (let i = 0; i < 10; i++) {
    //       this.list.push(this.list.length + 1)
    //     }
    //     // 加载状态结束
    //     this.loading = false

    //     // 数据全部加载完成
    //     if (this.list.length >= 40) {
    //       this.finished = true
    //     }
    //   }, 500)
    // }

  }
}
</script>

<style scoped lang="less">
.user-container {
  font-size: 14px;
  .user-info-container {
    padding: 12px;
    background-color: #fff;
    margin-bottom: 10px;
    >.row1 {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      .item {
        text-align: center;
        .text {
          font-size: 12px;
        }
      }
      >.col1 {
        width: 80px;
        height: 80px;
      }
      >.col2 {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        width: 80%;
        height: 80px;
        padding: 0 12px;
        >.row1 {
          display: flex;
          justify-content: space-between;
        }
        .action {
          display: flex;
          justify-content: space-between;
          .van-button {
            width: 45%;
          }
        }
      }
    }
  }
}
</style>
