<template>
  <div class="container">
    <div class="card mt-5">
      <div class="card-header text-center bg-primary text-white fw-bold">
        TodoList
      </div>
      <div class="card-body">
        <table class="table table-bordered border-primary text-center">
          <thead class="table-primary">
            <th>Item</th>
            <th>status</th>
            <th>time_completed</th>
            <th>Action</th>
          </thead>
          <tbody>
            <tr v-for="(item, index) in items.data" :key="index">
              <th>{{ item.name }}</th>
              <div v-if="item.completed == 0">
                <th>
                  <span class="badge rounded-pill bg-warning text-dark"
                    >Pending</span
                  >
                </th>
              </div>
              <div v-else>
                <th>
                  <span class="badge rounded-pill bg-success">Completed</span>
                </th>
              </div>

              <th>{{ item.completed_at }}</th>
              <th>
                <button
                  class="btn btn-primary btn-sm shadow"
                  @click.prevent="done(item.id)"
                >
                  done
                </button>
              </th>
            </tr>
          </tbody>
        </table>
        <h6>message : {{ itemsMessage.message }}</h6>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { reactive, onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
export default {
  setup() {
    let items = ref([]);
    let itemsMessage = ref([]);

    // get all data
    onMounted(async () => {
      await axios
        .get("http://127.0.0.1:8000/api/items")
        .then((result) => {
          items.value = result.data;
          itemsMessage.value = result.data;
          console.log(items.value);
        })
        .catch((err) => {
          console.log(err.response);
        });
    });
    const router = useRouter();
    const route = useRoute();

    let item = reactive({
      completed: true,
    });
    function done(id, index) {
      axios
        .put(`http://127.0.0.1:8000/api/item/${id}`, item)
        .then(() => window.location.reload())
        .catch((err) => console.log(err.response));
    }
    return {
      items,
      itemsMessage,
      done,
    };
  },
};
</script>
