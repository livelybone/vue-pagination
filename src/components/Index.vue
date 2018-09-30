<template>
  <div v-if="myConfig.pages>1||(noPage&&myConfig.pageSize<=myConfig.currPageSize)"
       class="pagination">
    <template v-if="inputConfig.enable">
      <span class="label">{{inputConfig.text}}</span>
      <input class="input" type="text" v-model="inputVal">
    </template>
    <div class="page-btn" v-html="_turnBtns.prev" :class="{disabled: myConfig.page<=1}"
         @click="prev">
    </div>
    <template v-if="!noPage">
      <div class="page-btn" v-for="(val,i) in pagesArr" :key="i"
           :class="{active:myConfig.page===val,disabled:!Number(val)}"
           @click="to(val)">{{val}}
      </div>
    </template>
    <div class="page-btn" v-html="_turnBtns.next"
         :class="{disabled: noPage
                  ?myConfig.pageSize>myConfig.currPageSize:myConfig.page>=myConfig.pages}"
         @click="next">
    </div>
  </div>
</template>

<script>
const configDefault = {
  pages: 1,
  page: 1,
  pageSize: 10,
  maxPageBtn: 7,
}

const noPageConfig = {
  page: 1,
  pageSize: 10,
  currPageSize: 10,
}

const inputDefault = {
  enable: true,
  text: 'Go to',
  debonceTime: 500,
}

const turnBtns = {
  prev: '<',
  next: '>',
}

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
  },
  watch: {
    'myConfig.page': {
      handler(val) {
        this.inputVal = val
      },
      immediate: true,
    },
    inputVal(val) {
      if (val !== this.myConfig.page) this.debonce(val)
    },
  },
  methods: {
    next() {
      let { page } = this.myConfig
      const { currPageSize, pageSize, pages } = this.myConfig
      page = +page + 1
      if (page <= pages || (this.noPage && currPageSize >= pageSize)) {
        this.$emit('to', page)
      } else {
        page = pages
      }
      return null
    },
    prev() {
      let { page } = this.myConfig
      page = +page - 1
      if (page > 0) {
        this.$emit('to', page)
      } else {
        page = 1
      }
    },
    to(val) {
      const page = Number(val)
      if (page) this.$emit('to', page)
    },
    debonce(val) {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        const { pages, currPageSize, pageSize } = this.myConfig
        if (+val > 0 && (this.noPage ? currPageSize >= pageSize : +val <= pages)) {
          this.to(val)
        }
      }, this.inputConfig.debonceTime)
    },
  },
}
</script>
