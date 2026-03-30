import React from "react";
import { X, Loader2, AlertCircle } from "lucide-react";
import { API_URL, useAuth } from "../Admin";

// ─────────────────────────────────────────────
// Modal
// ─────────────────────────────────────────────
interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
}

export function Modal({ open, onClose, title, children, size = "md" }: ModalProps) {
  if (!open) return null;
  const widths = { sm: "max-w-sm", md: "max-w-lg", lg: "max-w-2xl", xl: "max-w-4xl" };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className={`w-full ${widths[size]} bg-slate-800 rounded-2xl border border-slate-700 shadow-2xl flex flex-col max-h-[90vh]`}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700 flex-shrink-0">
          <h3 className="font-semibold text-white">{title}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="overflow-y-auto flex-1">
          {children}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Form Field
// ─────────────────────────────────────────────
interface FieldProps {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}
export function Field({ label, required, hint, children }: FieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-1.5">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      {children}
      {hint && <p className="text-xs text-slate-500 mt-1">{hint}</p>}
    </div>
  );
}

// ─────────────────────────────────────────────
// Input / Textarea / Select
// ─────────────────────────────────────────────
const inputCls = `w-full px-3 py-2 rounded-lg bg-slate-700 border border-slate-600
  text-white placeholder-slate-400 focus:outline-none focus:ring-2
  focus:ring-blue-500 focus:border-transparent transition text-sm`;

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${inputCls} ${props.className ?? ""}`} />;
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      rows={props.rows ?? 3}
      className={`${inputCls} resize-none ${props.className ?? ""}`}
    />
  );
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={`${inputCls} cursor-pointer ${props.className ?? ""}`}
    />
  );
}

// ─────────────────────────────────────────────
// Toggle / Checkbox
// ─────────────────────────────────────────────
interface ToggleProps {
  checked: boolean;
  onChange: (v: boolean) => void;
  label?: string;
}
export function Toggle({ checked, onChange, label }: ToggleProps) {
  return (
    <label className="flex items-center gap-2 cursor-pointer select-none">
      <div
        onClick={() => onChange(!checked)}
        className={`relative w-10 h-5 rounded-full transition-colors ${checked ? "bg-blue-600" : "bg-slate-600"}`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${checked ? "translate-x-5" : ""}`}
        />
      </div>
      {label && <span className="text-sm text-slate-300">{label}</span>}
    </label>
  );
}

// ─────────────────────────────────────────────
// Features Tag Input
// ─────────────────────────────────────────────
interface TagInputProps {
  value: string[];
  onChange: (v: string[]) => void;
  placeholder?: string;
}
export function TagInput({ value, onChange, placeholder }: TagInputProps) {
  const [input, setInput] = React.useState("");

  const add = () => {
    const trimmed = input.trim();
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed]);
    }
    setInput("");
  };

  const remove = (idx: number) => onChange(value.filter((_, i) => i !== idx));

  return (
    <div>
      <div className="flex gap-2 mb-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); add(); } }}
          placeholder={placeholder ?? "Ketik lalu Enter..."}
          className={inputCls + " flex-1"}
        />
        <button
          type="button"
          onClick={add}
          className="px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm transition"
        >
          Tambah
        </button>
      </div>
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {value.map((tag, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full
                         bg-slate-700 text-slate-200 text-xs"
            >
              {tag}
              <button type="button" onClick={() => remove(i)} className="hover:text-red-400">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// Image Uploader
// ─────────────────────────────────────────────
interface UploaderProps {
  currentUrl?: string | null;
  onUploaded: (path: string, url: string) => void;
  uploadType?: "fleet" | "gallery";
  accept?: string;
}
export function ImageUploader({ currentUrl, onUploaded, uploadType = "fleet", accept }: UploaderProps) {
  const { token } = useAuth();
  const [uploading, setUploading] = React.useState(false);
  const [preview, setPreview]     = React.useState<string | null>(currentUrl ?? null);
  const [error, setError]         = React.useState("");

  React.useEffect(() => {
    setPreview(currentUrl ?? null);
  }, [currentUrl]);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(""); setUploading(true);
    const form = new FormData();
    form.append("file", file);

    try {
      const res = await fetch(`${API_URL}/api-upload.php?type=${uploadType}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: form,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setPreview(data.file_url);
      onUploaded(data.file_path, data.file_url);
    } catch (err: any) {
      setError(err.message || "Upload gagal");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <label className={`
        relative flex flex-col items-center justify-center w-full h-40
        rounded-xl border-2 border-dashed cursor-pointer transition
        ${preview ? "border-slate-600" : "border-slate-600 hover:border-blue-500"}
        bg-slate-700/50 overflow-hidden
      `}>
        {uploading && (
          <div className="absolute inset-0 bg-slate-800/80 flex items-center justify-center z-10">
            <Loader2 className="w-6 h-6 animate-spin text-blue-400" />
          </div>
        )}
        {preview ? (
          <img src={preview} alt="preview" className="w-full h-full object-cover" />
        ) : (
          <div className="text-center px-4">
            <p className="text-sm text-slate-400">Klik untuk upload gambar</p>
            <p className="text-xs text-slate-500 mt-1">JPG, PNG, WebP, GIF — max 10MB</p>
          </div>
        )}
        <input
          type="file"
          accept={accept ?? "image/*"}
          onChange={handleFile}
          className="hidden"
        />
      </label>
      {error && (
        <p className="flex items-center gap-1 text-xs text-red-400 mt-1">
          <AlertCircle className="w-3 h-3" /> {error}
        </p>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// Confirm Delete Dialog
// ─────────────────────────────────────────────
interface ConfirmProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message?: string;
  loading?: boolean;
}
export function ConfirmDialog({ open, onClose, onConfirm, message, loading }: ConfirmProps) {
  return (
    <Modal open={open} onClose={onClose} title="Konfirmasi Hapus" size="sm">
      <div className="p-6 space-y-4">
        <p className="text-slate-300 text-sm">{message ?? "Yakin ingin menghapus data ini?"}</p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-sm transition"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white text-sm transition
                       disabled:opacity-50 flex items-center gap-2"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            Hapus
          </button>
        </div>
      </div>
    </Modal>
  );
}

// ─────────────────────────────────────────────
// Loading / Error states
// ─────────────────────────────────────────────
export function PageLoading() {
  return (
    <div className="flex items-center justify-center py-20">
      <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
    </div>
  );
}

export function PageError({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-3">
      <AlertCircle className="w-10 h-10 text-red-400" />
      <p className="text-slate-400 text-sm">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-sm transition"
        >
          Coba Lagi
        </button>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// Badge
// ─────────────────────────────────────────────
export function Badge({ children, color = "slate" }: { children: React.ReactNode; color?: "slate"|"green"|"blue"|"yellow"|"red" }) {
  const colors = {
    slate: "bg-slate-700 text-slate-300",
    green: "bg-green-500/20 text-green-400",
    blue:  "bg-blue-500/20 text-blue-400",
    yellow:"bg-yellow-500/20 text-yellow-400",
    red:   "bg-red-500/20 text-red-400",
  };
  return (
    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${colors[color]}`}>
      {children}
    </span>
  );
}

// ─────────────────────────────────────────────
// Action Buttons
// ─────────────────────────────────────────────
interface ActionBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "edit" | "delete" | "primary" | "ghost";
}
export function ActionBtn({ variant = "ghost", children, className, ...rest }: ActionBtnProps) {
  const cls = {
    edit:    "px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs transition",
    delete:  "px-3 py-1.5 rounded-lg bg-red-600/20 hover:bg-red-600/40 text-red-400 text-xs transition",
    primary: "px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition",
    ghost:   "px-3 py-1.5 rounded-lg hover:bg-slate-700 text-slate-400 text-sm transition",
  };
  return (
    <button {...rest} className={`${cls[variant]} ${className ?? ""}`}>
      {children}
    </button>
  );
}

// ─────────────────────────────────────────────
// Table wrapper
// ─────────────────────────────────────────────
export function Table({ headers, children }: { headers: string[]; children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-700">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-slate-800 border-b border-slate-700">
            {headers.map((h, i) => (
              <th key={i} className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {children}
        </tbody>
      </table>
    </div>
  );
}
