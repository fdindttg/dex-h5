<script>
import Member from "@/api/member";
import { mapActions } from "vuex";
export default {
  onLaunch: function () {
    setInterval(() => {
      this.$navFontColor();
    }, 1000);
    this.mobileLogo();
  },
  methods: {
    ...mapActions({
      setLogoMap: "logoMap",
    }),
    mobileLogo() {
      Member.mobileLogo().then((res) => {
        let data = res.data;
        this.setLogoMap({
          home_logo: data.home_logo,
          login_logo: data.login_logo,
          title_logo: data.title_logo,
          share_logo: data.share_logo,
          name: data.name,
        });
      });
    },
  },
  
  onShow: function () {
    uni.$emit("appShow");
    this.$navFontColor();
  },
  onHide: function () {},
};
</script>

<style lang="scss">
.layout-page {
  height: 100vh;
  font-size: 14px;
  background: $panel-1;
  color: $text-color;
}
@import "./assets/scss/app.scss";
/* 解决头条小程序组件内引入字体不生效的问题 */
/* #ifdef MP-TOUTIAO */
@font-face {
  font-family: uniicons;
  src: url("/static/uni.ttf");
}
/* #endif */
</style>
