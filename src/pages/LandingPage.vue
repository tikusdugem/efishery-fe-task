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
          align: 'left',
          field: 'komoditas',
          format: value => value === null ? 'Belum Diisi' : value,
          sortable: true
        },
        {
          name: 'area_provinsi',
          align: 'left',
          label: 'Provinsi',
          field: 'area_provinsi',
          format: value => value === null ? 'Belum Diisi' : value,
          sortable: true
        },
        {
          name: 'area_kota',
          align: 'left',
          label: 'Kota',
          field: 'area_kota',
          format: value => value === null ? 'Belum Diisi' : value,
          sortable: true
        },
        {
          name: 'size',
          align: 'left',
          label: 'Size',
          field: 'size',
          format: value => value === null ? 'Belum Diisi' : value,
          sortable: true
        },
        {
          name: 'price',
          align: 'left',
          label: 'Price',
          field: 'price',
          format: value => value === null ? 'Belum Diisi' : value,
          sortable: true
        },
        {
          name: 'tgl_parsed',
          align: 'left',
          label: 'Parsed',
          field: 'tgl_parsed',
          format: value => value === null ? 'Belum Diisi' : value,
          sortable: true
        },
        {
          name: 'timestamp',
          align: 'left',
          label: 'Timestamp',
          field: 'timestamp',
          format: value => value === null ? 'Belum Diisi' : value,
          sortable: true
        }
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
