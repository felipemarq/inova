import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEditProjectDialog } from "./useEditProjectDialog";
import { Textarea } from "@/components/ui/textarea";
import FileUploader from "@/components/FileUploader";
import { Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { translatedDepartments } from "@/app/utils/translatedDepartments";
import { cn } from "@/lib/utils";
import { Project } from "@/app/entities/Project";
import { StatusProject } from "@/app/entities/StatusProject";
import { ParticipantSelector } from "@/components/ParticipantSelector";

interface EditProjectDialogProps {
  className?: string;
  project: Project;
}

export function EditProjectDialog({
  className,
  project,
}: EditProjectDialogProps) {
  const {
    errors,
    handleSubmit,
    register,
    control,
    isLoading,
    filesToUpload,
    setFilesToUpload,
    open,
    setOpen,
    uploadedFiles,
    setSubmitStatus,
    setUploadedFiles,
  } = useEditProjectDialog(project, () => {
    setOpen(false); // Fecha o modal após submit
  });
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className={cn(className)}>
        <Button onClick={() => setOpen(true)}>Editar Projeto</Button>
      </DialogTrigger>
      <DialogContent className="lg:max-w-screen-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edição de Projeto</DialogTitle>
          <DialogDescription>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-2 gap-y-6 mt-6 ">
                <div className="flex flex-col gap-2 w-full md:col-span-6 items-start ">
                  <Label htmlFor="name">Título do projeto</Label>
                  <Input
                    className="w-full"
                    id="name"
                    type="text"
                    required
                    {...register("name")}
                    error={errors.name?.message}
                  />
                </div>
                <div className="flex flex-col gap-2 w-full md:col-span-6 items-start ">
                  <Label htmlFor="department">
                    Área de desenvolvimento do projeto
                  </Label>

                  <Controller
                    name="department"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Select onValueChange={onChange} defaultValue={value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma das opções" />
                        </SelectTrigger>

                        <SelectContent>
                          {translatedDepartments.map(({ label, value }) => (
                            <SelectItem value={value}>{label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                <div className="flex flex-col gap-2   md:col-span-12 items-start ">
                  <div className="w-full">
                    <Label htmlFor="description">Descrição do projeto</Label>
                    <Textarea
                      id="description"
                      required
                      placeholder="Adicione aqui uma breve descrição sobre o projeto"
                      {...register("description")}
                      className="w-full"
                      //error={errors.description?.message}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2 w-full md:col-span-12 items-start">
                  <Label htmlFor="participants">Participantes do projeto</Label>
                  <Controller
                    name="participants"
                    control={control}
                    defaultValue={[]}
                    render={({ field: { onChange, value } }) => (
                      <ParticipantSelector value={value} onChange={onChange} />
                    )}
                  />
                  {errors.participants && (
                    <p className="text-sm text-red-500">
                      {errors.participants.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2 w-full md:col-span-6 items-start">
                  <Label htmlFor="videoLink">Arquivo em vídeo</Label>
                  <Input
                    id="videoLink"
                    type="text"
                    placeholder="Insira o link aqui"
                    {...register("videoLink")}
                    error={errors.videoLink?.message}
                  />
                </div>

                <div className="flex flex-col gap-2 w-full  md:col-span-6 items-start ">
                  <Label htmlFor="file">Arquivos em PDF ou Word</Label>
                  <FileUploader
                    filesToUpload={filesToUpload}
                    setFilesToUpload={setFilesToUpload}
                    setUploadedFiles={setUploadedFiles}
                    projectId={project?.id}
                    uploadedFiles={uploadedFiles}
                  />
                </div>

                <div className="flex flex-col gap-2 w-full md:flex-row md:col-span-6 items-start md:col-start-8">
                  <div className="flex flex-col gap-4 w-full  ">
                    <Button
                      type="submit"
                      isLoading={isLoading}
                      disabled={isLoading}
                      onClick={() => setSubmitStatus(StatusProject.SUBMITTED)} // Define como SUBMITTED antes do submit
                    >
                      Enviar para avaliação
                    </Button>
                  </div>

                  <div className="flex flex-col gap-4 w-full  ">
                    <Button
                      type="submit"
                      isLoading={isLoading}
                      disabled={isLoading}
                      onClick={() => setSubmitStatus(StatusProject.DRAFT)} // Define como DRAFT antes do submit
                    >
                      Salvar Rascunho
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
