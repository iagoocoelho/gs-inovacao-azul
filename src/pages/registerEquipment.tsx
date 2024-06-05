import { Header } from "@/components/header";
import { useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { z } from "zod";
import { Container } from "@/components/ui/container";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  tipo_agua: z
    .string()
    .refine((value) => value !== "", { message: "Campo obrigatório" }),
  observacao: z.string().optional(),
});

const RegisterEquipment = () => {
  const { id } = useParams();
  const { toast } = useToast();

  const [location, setLocation] = useState<{
    latitude: null | number;
    longitude: null | number;
    hasLocale: boolean;
  }>({ latitude: null, longitude: null, hasLocale: false });
  const [vidaUtil, setVidaUtil] = useState(0);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tipo_agua: "",
      observacao: "",
    },
  });

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            hasLocale: true,
          });

          toast({
            description: (
              <>
                <p>Localizamos seu aparelho com sucesso!</p>
                <p>
                  Latitude: {position.coords.latitude}, Longitude:{" "}
                  {position.coords.longitude}
                </p>
              </>
            ),
            variant: "success",
          });
        },
        (err) => {
          toast({
            description: err.message,
            variant: "destructive",
          });

          setLocation({
            latitude: null,
            longitude: null,
            hasLocale: false,
          });
        }
      );
    } else {
      toast({
        description: "Geolocalização não é suportada pelo seu navegador.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (form.watch("tipo_agua") === "1") {
      setVidaUtil(500);
    } else {
      setVidaUtil(1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch("tipo_agua")]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!location.hasLocale) {
      return toast({
        description:
          "Por favor, nos informe a localização do equipamento clicando no botão 'Obter localização Atual'.",
        variant: "destructive",
      });
    }

    console.log({
      ...values,
      equipmentId: id,
      position: {
        latitude: location.latitude,
        longitude: location.longitude,
      },
    });
  }

  return (
    <>
      <Header />

      <Container>
        <h1 className="text-3xl font-bold text-white text-center">Manutenção</h1>

        <div className="mt-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="tipo_agua"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de água</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      required
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tipo de água" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">Doce</SelectItem>
                        <SelectItem value="2">Salgada</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormItem>
                <FormLabel>Precisão de vida útil</FormLabel>
                <FormControl>
                  <Input value={vidaUtil} disabled />
                </FormControl>
                <FormMessage />
              </FormItem>

              <FormField
                control={form.control}
                name="observacao"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Observações</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Caso queira adicionar alguma observação..."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-x-2 flex justify-end">
                <Button type="button" variant="outline" onClick={getLocation}>
                  {location.hasLocale
                    ? "Redefinir localização"
                    : "Obter localização Atual"}
                </Button>

                <Button type="submit">Enviar</Button>
              </div>
            </form>
          </Form>
        </div>
      </Container>
    </>
  );
};

export default RegisterEquipment;
