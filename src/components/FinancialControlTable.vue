<template>
      <table class="financial-control-table">
        <thead>
            <tr>
                <th v-for="(col, index) in columns" :key="col.id" @click="sortBy(col.field, index)" :class="{ active: col.orderActive }">
                    {{ col.title }}
                    <span class="arrow" :class="col.order"></span>
                </th>
            </tr>
        </thead>
        <tbody v-if="getDataAPI">
            <tr v-for="item in getDataAPI" :key="item._id">
                <td v-for="key in columns" :key="key.id">
                    {{  (key.field == 'value') ? `R$ ${Number(item[key.field]).toLocaleString()}` : item[key.field] }}
                </td>
            </tr>
            <tr v-if="getDataAPI && getDataAPI.length === 0">
                <td colspan="12" style="text-align: center;">{{ noDataMessage }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from "vue-property-decorator";

@Component
export default class FinancialControlTable extends Vue {
    columns = [
        { id: 1, title: 'Nome do Cliente', field: 'name', orderActive: false, order: 'asc'},
        { id: 2, title: 'Titulo', field: 'title', orderActive: false, order: 'asc'},
        { id: 3, title: 'Valor', field: 'value', orderActive: false, order: 'asc' },
        { id: 4, title: 'Desde', field: 'defaultedSince', orderActive: false, order: 'asc' }
    ]

    noDataMessage = 'Nenhuma dado encontrado!'

    @Prop()
    data!: any[]

    get getDataAPI() {
        return this.data
    }

    sortBy(field: string, index: number) {

        this.columns[index].order = (this.columns[index].order == 'asc') ? 'desc' : 'asc'

        const sort = (a: any, b: any) => {

            const valueA = (field === 'value') ? Number(a[field]) : a[field]
            const valueB = (field === 'value') ? Number(b[field]) : b[field]

            if (valueA < valueB) {
                return -1
            }

            if (valueA > valueB) {
                return 1
            }

            return 0
        }
        this.data.sort(sort)

        if (this.columns[index].order === 'desc') {
            this.data.reverse()
        }

        const indexAtive = this.columns.findIndex((col) => col.orderActive)
        if (indexAtive > 0) {
            this.columns[indexAtive].orderActive = false
        }
        this.columns[index].orderActive = true
        this.updateData(this.data)
    }

    @Emit("updateData")
    updateData(data: any) {
        return data
    }
}
</script>
<style scoped>
.financial-control-table {
    font-family: Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 100%;
    text-align: left;
    border-radius: 1px;
}

.financial-control-table th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #04AA6D;
    color: #fff;
    font-style: italic;
}

.financial-control-table tr:hover {background-color: #ddd;}

.financial-control-table td, .financial-control-table th {
  border: 1px solid #ddd;
  padding: 8px;
}

.arrow {
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 0;
  margin-left: 5px;
  opacity: 0.66;
}

.arrow.asc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid #fff;
}

.arrow.desc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid #fff;
}
</style>
