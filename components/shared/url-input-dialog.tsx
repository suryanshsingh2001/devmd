import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {} from "@/components/ui/drawer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import Image from "next/image";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerDescription,
} from "@/components/ui/drawer";
import { toast } from "sonner";


interface UrlInputDialogProps {
  onSubmit: (url: string) => Promise<void>;
  loading?: boolean;
}

const UrlInputDialog = ({ onSubmit, loading = false }: UrlInputDialogProps) => {
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 640px)");
  const [fromMedium, setFromMedium] = useState(false);

  type FormValues = z.infer<typeof formSchema>;

  const formSchema = z.object({
    url: z
      .string()
      .url("Please enter a valid URL")
      .refine(
        (url) => {
          //TODO: Enable Medium URL , right now only Peerlist URL is allowed.
          const ismedium =
            url.startsWith("https://medium.com/") || url.endsWith("medium.com");
          setFromMedium(ismedium);
          const ispeerlist = url.match(
            /https:\/\/peerlist\.io\/.*\/articles\/.*/
          );
          return ispeerlist || ismedium;
        },
        {
          message: "Please enter a Peerlist article URL",
        }
      ),
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
    },
  });

  const handleSubmit = async (values: FormValues) => {
    if(fromMedium){
      return toast.error("Medium URL is not supported yet.");
    }
    await onSubmit(values.url);
    form.reset();
    setOpen(false);
  };

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button variant="ghost" size="sm" className="text-sm">
            <FileText className="w-4 h-4 mr-2" />
            Import from URL
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full max-w-md p-6">
            <DrawerHeader className="flex flex-col items-center space-y-6">
              <div className="flex gap-4 items-center">
                <div className="relative group cursor-pointer transition-transform hover:scale-105">
                  <Image
                    src="/peerlist.svg"
                    alt="Peerlist"
                    width={48}
                    height={48}
                    className="rounded-lg"
                  />
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Peerlist
                  </div>
                </div>
                <div className="relative group cursor-pointer transition-transform hover:scale-105">
                  <Image
                    src="/medium.svg"
                    alt="Medium"
                    width={48}
                    height={48}
                    className="rounded-lg bg-white p-1"
                  />
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Medium
                  </div>
                </div>
              </div>
              <div className="text-center space-y-2">
                <DrawerTitle className="text-2xl font-semibold">
                  Import a Peerlist Article
                </DrawerTitle>
                <DrawerDescription className="text-muted-foreground text-sm">
                  Enter the URL of the article you want to import
                </DrawerDescription>
              </div>
            </DrawerHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="https://peerlist.io/..."
                          {...field}
                          className="h-11 text-base"
                        />
                      </FormControl>
                      <FormMessage className="text-sm" />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full h-11 text-base font-medium transition-all hover:scale-[1.02]"
                  disabled={loading || form.formState.isSubmitting}
                >
                  {loading ? "Importing..." : "Import Content"}
                </Button>
              </form>
            </Form>
          </div>
        </DrawerContent>
      </Drawer>
    );
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="text-sm">
          <FileText className="w-4 h-4 mr-2" />
          Import from URL
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] gap-6">
        <DialogHeader className="flex flex-col items-center space-y-6">
          <div className="flex gap-4 items-center">
            <div className="relative group cursor-pointer transition-transform hover:scale-105">
              <Image
                src="/peerlist.svg"
                alt="Peerlist"
                width={48}
                height={48}
                className="rounded-lg"
              />
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Peerlist
              </div>
            </div>
            <div className="relative group cursor-pointer transition-transform hover:scale-105">
              <Image
                src="/medium.svg"
                alt="Medium"
                width={48}
                height={48}
                className="rounded-lg bg-white p-1"
              />
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Medium
              </div>
            </div>
          </div>
          <div className="text-center space-y-2">
            <DialogTitle className="text-2xl font-semibold">
              Import a Peerlist Article
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-sm">
              Enter the URL of the article you want to import
            </DialogDescription>
          </div>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="https://peerlist.io/..."
                      {...field}
                      className="h-11 text-base"
                    />
                  </FormControl>
                  <FormMessage className="text-sm" />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full h-11 text-base font-medium transition-all hover:scale-[1.02]"
              disabled={loading || form.formState.isSubmitting}
            >
              {loading ? "Importing..." : "Import Content"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UrlInputDialog;
