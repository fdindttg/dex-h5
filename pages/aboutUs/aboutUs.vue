<template>
  <v-page>
    <v-header style="position: fixed;top: 0;width: 100vw;height: 40px;" :title="`${$t('base.e9')}`"></v-header>
    <rich-text style="margin-top: 40px;overflow: auto;background: #000;" :nodes="article.body"></rich-text>
  </v-page>
</template>
<script>
import College from '@/api/aboutUs'
export default {
  data() {
    return {
      article:{}
    };
  },
  created() {
    College.getServiceDetail(33).then(data => {
                  this.article = data.data;
                  console.log(this.article.body);
              }).catch(err => {})
	},
  computed: {
   
  },
  methods: {
  },
};
</script>
<style lang="scss" scoped>
</style>