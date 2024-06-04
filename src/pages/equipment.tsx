import { Header } from "@/components/header";
import { useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { z } from "zod";
import { Container } from "@/components/ui/container";
import { useState } from "react";

const formSchema = z.object({
  username: z.string().min(2).max(50),
});

const Equipment = () => {
  const { id } = useParams();

  const [location, setLocation] = useState<{
    latitude: null | number;
    longitude: null | number;
  }>({ latitude: null, longitude: null });
  const [error, setError] = useState();

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setError(null);
        },
        (err) => {
          setError(err.message);
        }
      );
    } else {
      setError("Geolocalização não é suportada pelo seu navegador.");
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <>
      <Header />

      <Container>
        <h1 className="text-3xl font-bold">Equipamento {id}</h1>

        {location.latitude && location.longitude ? (
          <div>
            <h2>Localização Atual do equipamento:</h2>
            <p>Latitude: {location.latitude}</p>
            <p>Longitude: {location.longitude}</p>
          </div>
        ) : (
          <p>Localização não informada, por favor clique no botão 'Obter localização Atual'</p>
        )}
        {error && <p>Error: {error}</p>}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-x-2 flex justify-end">
              <Button type="button" onClick={getLocation}>
                Obter localização Atual
              </Button>

              <Button type="submit">Enviar</Button>
            </div>
          </form>
        </Form>
      </Container>
    </>
  );
};

export default Equipment;
