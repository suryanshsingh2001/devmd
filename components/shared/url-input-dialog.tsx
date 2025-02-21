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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  url: z
    .string()
    .url("Please enter a valid URL")
    .refine(
      (url) => {
        //TODO: Enable Medium URL , right now only Peerlist URL is allowed. 
        const ismedium =
          url.startsWith("https://medium.com/") || url.endsWith("medium.com");
        const ispeerlist = url.match(
          /https:\/\/peerlist\.io\/.*\/articles\/.*/
        );
        return ispeerlist;
      },
      {
        message: "Please enter a Peerlist article URL",
      }
    ),
});

type FormValues = z.infer<typeof formSchema>;

interface UrlInputDialogProps {
  onSubmit: (url: string) => Promise<void>;
  loading?: boolean;
}

const UrlInputDialog = ({ onSubmit, loading = false }: UrlInputDialogProps) => {
  const [open, setOpen] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
    },
  });

  const handleSubmit = async (values: FormValues) => {
    await onSubmit(values.url);
    form.reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="text-sm">
          <FileText className="w-4 h-4 mr-2" />
          Import from URL
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] space-y-6">
        <DialogHeader className="space-y-4">
          <DialogTitle className="text-xl">
            Import from Medium or Peerlist
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Enter the URL of a Medium or Peerlist article to import its content.
          </DialogDescription>
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
                      placeholder="Enter article URL..."
                      {...field}
                      className="h-11"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full h-11"
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
