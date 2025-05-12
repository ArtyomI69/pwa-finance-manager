'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useGate, useUnit } from 'effector-react';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/shadcnui/ui/form';
import { Button } from '@/shared/components/shadcnui/ui/button';
import { Card, CardContent } from '@/shared/components/shadcnui/ui/card';
import { Input } from '@/shared/components/shadcnui/ui/input';
import { PasswordInput } from '@/shared/components/shadcn-form/ui/password-input';
import { ProfilePhotoUpload, updateProfilePhotoEv } from '@/features/ProfilePhotoUpload';
import { FullScreenLoader } from '@/shared/components/ui/FullScreenLoader';
import {
  $email,
  $name,
  getProfileFx,
  ProfileFormGate,
  updateProfileEv,
} from '../model/ProfileForm.store';

// Define validation schema using Zod
const formSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: 'Имя должно быть длиной не менее 2 символов' })
      .max(100, { message: 'Имя должен быть длиной не более 100 символов' }),
    email: z.string().email({ message: 'Неверный адрес электронной почты' }),
    password: z.string(),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Пароли не совпадают',
  });

export function ProfileForm() {
  const loading = useUnit(getProfileFx.pending);
  const name = useUnit($name);
  const email = useUnit($email);
  useGate(ProfileFormGate);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      name,
      email,
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit({ email, name, password }: z.infer<typeof formSchema>) {
    updateProfileEv({ email, name, password });
  }

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const file = files[0];

    updateProfilePhotoEv(file);
  };

  if (loading) return <FullScreenLoader />;

  return (
    <div className="flex flex-1 max-w-2xl mx-auto min-h-[60vh] h-full w-full items-center justify-center px-4 pb-12">
      <Card className="mx-auto max-w-2xl flex flex-1">
        <CardContent className="flex-1">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid gap-4">
                <ProfilePhotoUpload
                  id="profile-photo-upload"
                  aria-label="Profile photo upload"
                  onFileChange={onFileChange}
                />

                {/* Name Field */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel htmlFor="name">Имя</FormLabel>
                      <FormControl>
                        <Input id="name" placeholder="Имя" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email Field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <FormControl>
                        <Input
                          id="email"
                          placeholder="johndoe@mail.com"
                          type="email"
                          autoComplete="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password Field */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel htmlFor="password">Пароль</FormLabel>
                      <FormControl>
                        <PasswordInput
                          id="password"
                          placeholder="******"
                          autoComplete="new-password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Confirm Password Field */}
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel htmlFor="confirmPassword">Подтвердите пароль</FormLabel>
                      <FormControl>
                        <PasswordInput
                          id="confirmPassword"
                          placeholder="******"
                          autoComplete="new-password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">
                  Обновить профиль
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
