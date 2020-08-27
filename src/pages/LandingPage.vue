<template>
  <q-page class="flex flex-center">
    <q-table
      title="Treats"
      :data="fish"
      :columns="columns"
      row-key="name"
    />
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'LandingPage',
  created () {
    this.getListFish()
  },
  data () {
    return {
      columns: [
        {
          name: 'komoditas',
          required: true,
          label: 'Komoditas',
          align: 'center',
          field: 'komoditas',
          format: value => value === null ? 'Belum Diisi' : value,
          sortable: true
        },
        { name: 'area_provinsi', align: 'center', label: 'Provinsi', field: 'area_provinsi', sortable: true },
        { name: 'area_kota', align: 'center', label: 'Kota', field: 'area_kota', sortable: true },
        { name: 'size', align: 'center', label: 'Size', field: 'size', sortable: true },
        { name: 'price', align: 'center', label: 'Price', field: 'price', sortable: true },
        { name: 'tgl_parsed', align: 'center', label: 'Parsed', field: 'tgl_parsed', sortable: true },
        { name: 'timestamp', align: 'center', label: 'Timestamp', field: 'timestamp', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
      ]
    }
  },
  computed: {
    ...mapGetters({
      fish: 'landingPage/fish'
    })
  },
  methods: {
    ...mapActions({
      getListFish: 'landingPage/getListFish'
    })
  }
}
</script>
