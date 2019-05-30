<template>
  <div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {
    this.$router.push({
      path: "/"
    });
    window.open(
      "https://passport.umeng.com/login?spm=a211g2.181323.0.0.3cb25574Hk2ZhT&redirectURL=https%3A%2F%2Fwww.umeng.com%2F"
    );
  }
};
</script>
<style>
</style>
