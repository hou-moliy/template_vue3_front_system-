<template>
  <div class="custom-input">
    <input type="text" v-model="inputValue" class="custom-input__input" ref="input" @blur="onBlur" />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
const inputValue = ref("");
defineProps({
  modelValue: {
    type: String,
    default: ""
  }
});
const emits = defineEmits(["update:modelValue"]);
onMounted(() => {
  focusInput();
});

const focusInput = () => {
  const inputElement = ref.input;
  if(inputElement) {
    inputElement.focus();
  }
};
watch(
  () => inputValue.value,
  newVal => {
    emits("update:modelValue", newVal);
  }
);
const onBlur = () => {
  // Emit custom event or perform any necessary actions
};
</script>

<style scoped>
.custom-input {
  position: relative;
  display: inline-block;
}

.custom-input__input {
  width: 50px;
  height: 24px;
  padding: 2px;
  border: 1px solid #ccc;
}

.custom-input__input::before,
.custom-input__input::after {
  content: "【】";
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  padding: 0 4px;
  pointer-events: none;
  color: #ccc;
}

.custom-input__input::before {
  left: 0;
}

.custom-input__input::after {
  right: 0;
}
</style>
