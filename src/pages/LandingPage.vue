<template>
  <q-page class="q-pa-md">
    <q-table
      :data="fish"
      :columns="columns"
      row-key="uuid"
      :filter="filter"
      :dense="$q.screen.lt.md"
    >
      <template v-slot:top>
        <div class="text-h6">List of Fish</div>
        <q-space />
        <div class="row q-gutter-xs">
          <q-input outlined dense debounce="300" v-model="filter" placeholder="Search">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
          <q-btn color="primary" label="Add Fish" @click="addFish" />
        </div>
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td class="q-gutter-xs" :props="props">
          <q-btn no-caps size="sm" color="secondary" label="Edit" @click="editFish(props)" />
          <q-btn no-caps size="sm" color="negative" label="Delete" @click="openConfirmDelete(props)" />
        </q-td>
      </template>
    </q-table>

    <q-dialog v-model="isDialog">
      <q-card class="my-card">
        <q-card-section>
          <div class="text-h6 text-center">Form Tambah Ikan</div>
        </q-card-section>

        <q-card-section>
          <div class="q-gutter-md">
            <q-input outlined v-model="form.komoditas" label="Komoditas" />

            <q-skeleton v-if="isFormAreaLoading" type="QInput" />
            <q-select v-else outlined v-model="form.area_provinsi" :options="province" label="Provinsi" />

            <q-skeleton v-if="isFormAreaLoading" type="QInput" />
            <q-select v-else outlined v-model="form.area_kota" :options="city" label="Kota" />

            <q-skeleton v-if="isFormSizeLoading" type="QInput" />
            <q-select v-else outlined v-model="form.size" :options="size" label="Ukuran" />

            <q-input ref="price" prefix="Rp. " outlined v-model.lazy="form.price" v-money="money" label="Harga" />

            <q-input outlined v-model="form.tgl_parsed" mask="date" :rules="['date']">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                    <q-date v-model="form.tgl_parsed">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn outline class="bg-white text-teal" label="Cancel" @click="resetForm" v-close-popup />
          <q-btn
            outline
            color="primary"
            label="Submit"
            @click="typeDialog === 'add' ? isConfirmDialog = true : isDialogEdit = true"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="isConfirmDialog" persistent transition-show="scale" transition-hide="scale">
      <q-card style="width: 300px">

        <q-card-section>
          Apakah anda yakin ingin menambahkan ikan?
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn no-caps :disable="isBtnConfirmDialog" outline label="Cancel" v-close-popup />
          <q-btn
            no-caps
            color="primary"
            :disable="isBtnConfirmDialog"
            :loading="isBtnConfirmDialog"
            outline
            label="Wokeee"
            @click="submitFish"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog
      v-model="isDialogDelete"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card style="width: 300px">

        <q-card-section>
          Apakah anda yakin ingin menghapus
          <strong>{{ tempDataDelete.komoditas }}</strong> data?
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn
            no-caps
            outline
            :disable="isBtnConfirmDialog"
            label="Cancel Hapus"
            @click="closeConfirmDelete"
          />
          <q-btn
            no-caps
            outline
            color="negative"
            :disable="isBtnConfirmDialog"
            :loading="isBtnConfirmDialog"
            label="Iyaa Hapus"
            @click="submitDeleteFish"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog
      v-model="isDialogEdit"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card style="width: 300px">

        <q-card-section>
          Apakah anda yakin ingin mengupdate
          <strong>{{ form.komoditas }}</strong> data?
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn
            no-caps
            :disable="isBtnConfirmDialog"
            outline
            label="Cancel"
            v-close-popup
          />
          <q-btn
            no-caps
            color="primary"
            :disable="isBtnConfirmDialog"
            :loading="isBtnConfirmDialog"
            outline
            label="Wokeee"
            @click="submitEditFish"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { VMoney } from 'v-money'
import { date } from 'quasar'

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
          format: value => value === null ? '-' : value,
          sortable: true
        },
        {
          name: 'area_provinsi',
          align: 'left',
          label: 'Provinsi',
          field: 'area_provinsi',
          format: value => value === null ? '-' : value,
          sortable: true
        },
        {
          name: 'area_kota',
          align: 'left',
          label: 'Kota',
          field: 'area_kota',
          format: value => value === null ? '-' : value,
          sortable: true
        },
        {
          name: 'size',
          align: 'left',
          label: 'Size',
          field: 'size',
          format: value => value === null ? '-' : value,
          sortable: true
        },
        {
          name: 'price',
          align: 'left',
          label: 'Price',
          field: 'price',
          format: value => {
            if (value === null) {
              return '-'
            } else {
              return new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0
              })
                .format(value.split('.').join(''))
            }
          },
          sortable: true
        },
        {
          name: 'tgl_parsed',
          align: 'left',
          label: 'Parsed',
          field: 'tgl_parsed',
          format: value => {
            if (value === null) {
              return '-'
            } else {
              return date.formatDate(value, 'YYYY/MM/DD')
            }
          },
          sortable: true
        },
        {
          name: 'actions',
          align: 'center',
          label: 'Actions'
        }
      ],
      filter: '',

      tempDataDelete: {},
      typeDialog: '',

      isDialog: false,
      isConfirmDialog: false,
      isDialogDelete: false,
      isDialogEdit: false,
      isBtnConfirmDialog: false,
      isFormAreaLoading: false,
      isFormSizeLoading: false,

      form: {
        komoditas: '',
        area_provinsi: '',
        area_kota: '',
        size: null,
        price: null,
        tgl_parsed: date.formatDate(new Date(), 'YYYY/MM/DD')
      },

      money: {
        thousands: '.',
        precision: 0,
        masked: false /* doesn't work with directive */
      }
    }
  },
  directives: {
    money: VMoney
  },
  computed: {
    ...mapGetters({
      fish: 'landingPage/fish',
      province: 'landingPage/province',
      city: 'landingPage/city',
      size: 'landingPage/size'
    })
  },
  methods: {
    ...mapActions({
      getListFish: 'landingPage/getListFish',
      postFish: 'landingPage/postFish',
      deleteFish: 'landingPage/deleteFish',
      updateFish: 'landingPage/updateFish',
      getListArea: 'landingPage/getListArea',
      getListSize: 'landingPage/getListSize'
    }),
    resetForm () {
      this.form = {
        komoditas: '',
        area_provinsi: '',
        area_kota: '',
        size: null,
        price: null,
        tgl_parsed: date.formatDate(new Date(), 'YYYY/MM/DD')
      }

      // Fix bug for v-money
      this.$refs.price.$el.getElementsByTagName('input')[0].value = null
    },
    addFish () {
      this.typeDialog = 'add'
      this.isDialog = true

      if (this.province.length === 0 || this.city.length === 0) {
        this.isFormAreaLoading = true
      } else {
        this.isFormAreaLoading = false
      }

      if (this.size.length === 0) {
        this.isFormSizeLoading = true
      } else {
        this.isFormSizeLoading = false
      }

      this.getListArea()
        .then(() => {
          setTimeout(() => {
            this.isFormAreaLoading = false
          }, 300)
        })

      this.getListSize()
        .then(() => {
          setTimeout(() => {
            this.isFormSizeLoading = false
          }, 300)
        })
    },
    submitFish () {
      this.isBtnConfirmDialog = true

      this.postFish(this.form)
        .then(res => {
          this.isConfirmDialog = false
          this.isDialog = false
          this.isBtnConfirmDialog = false

          this.getListFish()

          this.$q.notify({
            message: res.updatedRange,
            color: 'primary',
            position: 'center'
          })
        })
        .catch(() => {
          this.isConfirmDialog = false
          this.isDialog = false
          this.isBtnConfirmDialog = false

          this.$q.notify({
            message: 'Gagal menambahkan ikan',
            color: 'negative',
            position: 'center'
          })
        })
    },
    openConfirmDelete ({ row }) {
      this.tempDataDelete = row
      this.isDialogDelete = true
    },
    closeConfirmDelete () {
      this.isDialogDelete = false
      this.tempDataDelete = {}
    },
    submitDeleteFish () {
      this.isBtnConfirmDialog = true

      this.deleteFish({
        uuid: this.tempDataDelete.uuid
      })
        .then(res => {
          this.isDialogDelete = false
          this.isBtnConfirmDialog = false
          this.tempDataDelete = {}

          this.getListFish()

          this.$q.notify({
            message: res.clearedRowsCount,
            color: 'primary',
            position: 'center'
          })
        })
        .catch(() => {
          this.isDialogDelete = false
          this.isBtnConfirmDialog = false
          this.tempDataDelete = {}

          this.$q.notify({
            message: 'Anda gagal menghapus',
            color: 'negative',
            position: 'center'
          })
        })
    },
    editFish ({ row }) {
      this.typeDialog = 'edit'
      this.isDialog = true

      this.form = {
        uuid: row.uuid,
        komoditas: row.komoditas,
        area_provinsi: row.area_provinsi,
        area_kota: row.area_kota,
        size: row.size,
        price: row.price,
        tgl_parsed: date.formatDate(row.tgl_parsed, 'YYYY/MM/DD')
      }

      this.getListArea()
      this.getListSize()
    },
    submitEditFish () {
      this.isBtnConfirmDialog = true

      this.updateFish([
        // Edit by uuid
        {
          uuid: this.form.uuid
        },
        // Set data
        {
          komoditas: this.form.komoditas,
          area_provinsi: this.form.area_provinsi,
          area_kota: this.form.area_kota,
          size: this.form.size,
          price: this.form.price,
          tgl_parsed: date.formatDate(this.form.tgl_parsed, 'YYYY/MM/DD')
        }
      ])
        .then(res => {
          this.isDialogEdit = false
          this.isDialog = false
          this.isBtnConfirmDialog = false

          this.getListFish()

          this.$q.notify({
            message: res.totalUpdatedRows,
            color: 'primary',
            position: 'center'
          })
        })
        .catch(err => {
          alert(err)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.my-card {
  width: 100%;
  max-width: 500px;
}
</style>
