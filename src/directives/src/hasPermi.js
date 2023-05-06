/**
 * 操作权限指令
 * 使用方式：
 * 1. v-hasPermi.disabled="['editor']" ，只有editor角色才能操作，其余角色按钮置灰不可点击
 * 2.  v-hasPermi="['editor']"，只有editor角色才能操作，其余角色按钮不可见
 */
import { AuthStore } from "@/stores/modules/auth";

const permission = {
  mounted (el, binding) {
    const authStore = AuthStore();
    const { value, modifiers } = binding;
    console.log(modifiers, "binding");
    const allPermission = "*:*:*";
    const roles = authStore && authStore.roles;

    if (value && value instanceof Array && value.length > 0) {
      const permissionRoles = value;

      const hasPermissions = roles.some(permission => {
        return allPermission === permission || permissionRoles.includes(permission);
      });

      if (!hasPermissions) {
        if (modifiers.disabled) {
          // 禁用按钮
          el.disabled = true;
          el.classList.add("is-disabled");
        } else {
          // 删除按钮
          el.parentNode && el.parentNode.removeChild(el);
        }
      }
    } else {
      throw new Error("请设置操作权限标签值,例如 v-hasPermi=\"['admin','editor']\"");
    }
  }
};
export default permission;
