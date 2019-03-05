<template>
  <div v-if="show"
       class="pagination">
    <template v-if="inputConfig.enable">
      <span class="label">{{inputConfig.text}}</span>
      <input class="input" type="text" v-model="inputVal">
    </template>
    <div class="page-btn"
         v-html="_turnBtns.prev"
         :class="{disabled: disabled.pre}"
         @click="prev">
    </div>
    <template v-if="!noPage">
      <div class="page-btn"
           v-for="(val,i) in pagesArr" :key="i"
           :class="{active:myConfig.page===val,disabled:!Number(val)}"
           @click="to(val)">{{val}}
      </div>
    </template>
    <div class="page-btn"
         v-html="_turnBtns.next"
         :class="{disabled: disabled.next}"
         @click="next">
    </div>
  </div>
</template>

<script>
const configDefault = Object.freeze({
  pages: 1,
  page: 1,
  pageSize: 10,
  maxPageBtn: 7,
})

const noPageConfig = Object.freeze({
  page: 1,
  pageSize: 10,
  currPageSize: 10,
})

const inputDefault = Object.freeze({
  enable: true,
  text: 'Go to',
  debonceTime: 500,
})

const turnBtns = Object.freeze({
  prev: '<',
  next: '>',
})

export default {
  name: 'Pagination',
  props: {
    noPage: Boolean,
    config: Object,
    input: Object,
    turnBtns: Object,
  },
  data() {
    return {
      inputVal: '',
      timer: null,
    }
  },
  computed: {
    myConfig() {
      return { ...(this.noPage ? noPageConfig : configDefault), ...this.config }
    },
    inputConfig() {
      return { ...inputDefault, ...this.input }
    },
    _turnBtns() {
      return { ...turnBtns, ...this.turnBtns }
    },
    pagesArr() {
      const { page, maxPageBtn, pages } = this.myConfig
      if (pages <= maxPageBtn) {
        return [...Array(pages)].map((val, i) => i + 1)
      }
      if (page <= (maxPageBtn + 1) / 2) {
        return [...Array(maxPageBtn - 1)].map((val, i) => (i === maxPageBtn - 2 ? '...' : i + 1)).concat([pages])
      }
      if (page >= pages - (maxPageBtn - 1) / 2) {
        return [1, '...'].concat([...Array(maxPageBtn - 2)].map((val, i) => pages - i).reverse())
      }
      return [1, '...'].concat([...Array(maxPageBtn - 4)].map((val, i) => page - Math.floor((maxPageBtn - 3) / 2) + i + 1)).concat(['...', pages])
    },
    disabled() {
      return {
        pre: this.myConfig.page <= 1,
        next: this.noPage
          ? this.myConfig.pageSize > this.myConfig.currPageSize
          : this.myConfig.page >= this.myConfig.pages,
      }
    },
    show() {
      return this.myConfig.pages > 1 ||
        !(this.noPage &&
          (this.myConfig.page <= 1 &&
            (this.myConfig.pageSize > this.myConfig.currPageSize)))
    },
  },
  watch: {
    'myConfig.page': {
      handler(val) {
        this.inputVal = +val
      },
      immediate: true,
    },
    inputVal(val) {
      const v = +val
      if (v !== +this.myConfig.page) this.debonce(v)
    },
  },
  methods: {
    next() {
      const page = +this.myConfig.page + 1
      if (!this.disabled.next) {
        this.$emit('to', page)
      }
    },
    prev() {
      const page = +this.myConfig.page - 1
      if (!this.disabled.pre) {
        this.$emit('to', page)
      }
    },
    to(val) {
      const page = Number(val)
      if (page) this.$emit('to', page)
    },
    debonce(val) {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        const { page, pages, currPageSize, pageSize } = this.myConfig
        if (val > 0 && (this.noPage ? currPageSize >= pageSize || val <= +page : val <= pages)) {
          this.to(val)
        }
      }, this.inputConfig.debonceTime)
    },
  },
}
</script>
