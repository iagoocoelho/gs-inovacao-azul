/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { GeoapifyGeocoderAutocomplete } from "@geoapify/react-geocoder-autocomplete";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  tipo_agua: z
    .string()
    .refine((value) => value !== "", { message: "Campo obrigatório" }),
  observacao: z.string().optional(),
  apelido: z.string(),
});

const RegisterEquipment = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [vidaUtil, setVidaUtil] = useState(0);
  const [localeByAddress, setLocaleByAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tipo_agua: "",
      observacao: "",
    },
  });

  const getLocation = () => {
    if (navigator.geolocation) {
      setIsLoading(true);

      navigator.geolocation.getCurrentPosition(
        (position) => {
          handleSearchByCoordenate(
            position.coords.latitude,
            position.coords.longitude
          );
        },
        (err) => {
          setIsLoading(false);
          toast({
            description: err.message,
            variant: "destructive",
          });
        }
      );
    } else {
      setIsLoading(false);
      toast({
        description: "Geolocalização não é suportada pelo seu navegador.",
        variant: "destructive",
      });
    }
  };

  const handleSearchByCoordenate = async (lat: number, lon: number) => {
    fetch(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&lang=pt&apiKey=${
        import.meta.env.VITE_MAPS_API_KEY
      }`
    )
      .then((response) => response.json())
      .then((data) => {
        toast({
          description: <p>Localização selecionada com sucesso!</p>,
          variant: "success",
        });

        setLocaleByAddress(data.features[0].properties.address_line2);
        setIsLoading(false);
      });
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
    if (!localeByAddress) {
      return toast({
        description: "Por favor, nos informe a localização do equipamento.",
        variant: "destructive",
      });
    }

    console.log({
      ...values,
      equipmentId: id,
    });

    toast({
      description: "Cadastro realizado com sucesso!",
      variant: "success",
    });

    navigate("/equipamentos");
  }

  const onPlaceSelect = (value: any) => {
    if (value === null) {
      return setLocaleByAddress("");
    }

    setLocaleByAddress(value.properties.address_line2);
  };

  return (
    <>
      <Header />

      <Container>
        <h1 className="text-3xl font-bold text-white text-center">Cadastro</h1>

        <div className="mt-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="apelido"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Apelido do Equipamento</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex: Equipamento Rio Ipiranga"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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

              <FormItem className="input-autocomplete-address">
                <FormLabel>Local de instalação</FormLabel>
                <FormControl>
                  <GeoapifyGeocoderAutocomplete
                    placeholder="Digite o endereço"
                    lang="pt"
                    placeSelect={onPlaceSelect}
                    debounceDelay={1000}
                    value={localeByAddress}
                  />
                </FormControl>
              </FormItem>

              <div className="justify-center flex">
                <Button
                  type="button"
                  variant="seaBtn"
                  disabled={isLoading}
                  onClick={getLocation}
                >
                  {isLoading
                    ? "Obtendo localização..."
                    : localeByAddress
                    ? "Redefinir localização"
                    : "Obter localização Atual"}
                </Button>
              </div>

              <div className="space-x-2 flex justify-end">
                <Button type="submit" variant="seaBtn">
                  Enviar
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </Container>
    </>
  );
};

export default RegisterEquipment;
