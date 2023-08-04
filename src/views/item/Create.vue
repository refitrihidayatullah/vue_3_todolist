<template>
  <div class="container">
    <div class="card mt-5">
      <div class="card-header text-center bg-primary text-white fw-bold">
        TodoList
      </div>
      <div class="card-body">
        <router-link
          :to="{ name: 'item.index' }"
          class="btn btn-primary shadow btn-sm mb-3"
          >back</router-link
        >
        <form @submit.prevent="store()">
          <div class="mb-3">
            <label for="" class="form-label">Item Name</label>
            <input
              type="text"
              class="form-control"
              id="name"
              v-model="item.name"
            />
            <div v-if="validation.name" class="text-danger">
              {{ validation.name[0] }}
            </div>
          </div>
          <button class="btn btn-sm btn-outline-primary">save</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
export default {
  setup() {
    const item = reactive({
      name: "",
    });
    // menampung err
    const validation = ref([]);
    // redirect
    const router = useRouter();
    // function store
    function store() {
      axios
        .post("http://127.0.0.1:8000/api/item/store", item)
        .then(() => {
          router.push({
            name: "item.index",
          });
        })
        .catch((err) => {
          validation.value = err.response.data;
          console.log(err.response.data.name);
        });
    }
    return {
      item,
      validation,
      store,
    };
  },
};
</script>
