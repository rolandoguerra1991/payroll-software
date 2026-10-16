<script setup lang="ts">
import { router } from '@inertiajs/vue3';
import { ref } from 'vue';
import Button from '@/components/ui/Button.vue';
import Icon from '@/components/ui/Icon.vue';
import TextInput from '@/components/ui/TextInput.vue';
import AuthLayout from '@/layouts/AuthLayout.vue';
import { dashboard as adminDashboard } from '@/routes/admin';

const code = ref('');
const recoveryCode = ref('');
const isUsingRecoveryCode = ref(false);

function submit(): void {
    router.visit(adminDashboard.url());
}
</script>

<template>
    <AuthLayout
        title="Two-factor authentication"
        heading="Two-factor authentication"
        description="Enter the code from your authenticator app to finish signing in."
    >
        <form class="mt-8 space-y-5" @submit.prevent="submit">
            <TextInput
                v-if="!isUsingRecoveryCode"
                id="code"
                v-model="code"
                name="code"
                autocomplete="one-time-code"
                inputmode="numeric"
                placeholder="123456"
                label="Authentication code"
                autofocus
            />

            <TextInput
                v-else
                id="recovery_code"
                v-model="recoveryCode"
                name="recovery_code"
                autocomplete="one-time-code"
                placeholder="xxxx-xxxx-xxxx"
                label="Recovery code"
                autofocus
            />

            <div class="flex justify-end">
                <button
                    v-if="!isUsingRecoveryCode"
                    type="button"
                    class="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                    @click="isUsingRecoveryCode = true"
                >
                    Use a recovery code
                </button>
                <button
                    v-else
                    type="button"
                    class="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                    @click="isUsingRecoveryCode = false"
                >
                    Use an authentication code
                </button>
            </div>

            <Button type="submit" class="w-full">
                Sign in
                <Icon name="arrow-right" class="h-4 w-4" />
            </Button>
        </form>
    </AuthLayout>
</template>
