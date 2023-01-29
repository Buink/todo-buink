<template>
  <div class="form">

    <h3 class="text-secondary">{{ props.formName }}</h3>

    <Form @submit="submit" class="d-flex flex-column">

      <div
          v-for="field in schema.fields"
          :key="field.name"
          class="ma-2 d-flex flex-column"
      >
        <label :for="field.name">{{ field.label }}</label>
        <Field
            :name="field.name"
            :placeholder="field.name"
            :type="field.type"
            :rules="field.rules"
            class="bg-background-lighten-2 rounded pa-2"
        />
        <ErrorMessage
            :name="field.name"
            class="text-red"
        />
      </div>

      <div class="ma-2">
        <button>
          <v-btn color="secondary">{{ props.btnText }}</v-btn>
        </button>
      </div>

    </Form>
  </div>
</template>

<script setup>
import { Field, Form, ErrorMessage } from 'vee-validate';
import {defineProps} from "vue";

const props = defineProps({
  formName: {
    type: String,
    required: true
  },
  btnText: {
    type: String,
    required: true
  },
  schema: {
    type: Object,
    required: true,
  },
});

const submit = (values, { resetForm }) => {
  console.log(values);
  resetForm();
}


</script>

<style scoped>

</style>