'use client';

import { Link } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/shadcnui/ui/form';
import { Button } from '@/shared/components/shadcnui/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/shadcnui/ui/card';
import { Input } from '@/shared/components/shadcnui/ui/input';
import { PasswordInput } from '@/shared/components/shadcn-form/ui/password-input';
import { RoutePath } from '@/shared/config/routeConfig/routeConfig';
import { registerEv } from '../model/RegisterPage.store';

// Define validation schema using Zod
const formSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: 'Имя должно быть длиной не менее 2 символов' })
      .max(100, { message: 'Имя должен быть длиной не более 100 символов' }),
    email: z.string().email({ message: 'Неверный адрес электронной почты' }),
    password: z
      .string()
      .min(6, { message: 'Пароль должен быть длиной не менее 6 символов' })
      .regex(/[a-zA-Z0-9]/, { message: 'Пароль должен состоять из букв и цифр' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Пароли не совпадают',
  });

export default function RegisterPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit({ email, name, password }: z.infer<typeof formSchema>) {
    registerEv({ email, name, password });
  }

  return (
    <div className="flex flex-1 min-h-[60vh] h-full w-full items-center justify-center px-4">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Регистрация</CardTitle>
          <CardDescription>Создайте новую учетную запись, заполнив форму ниже.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid gap-4">
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
                  Создать учётную запись
                </Button>
              </div>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            Уже есть учётная запись?{' '}
            <Link to={RoutePath.login} className="underline">
              Войти
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
