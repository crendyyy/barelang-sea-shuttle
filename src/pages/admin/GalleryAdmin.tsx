import { useState, useEffect, useCallback, useRef } from "react";
import {
  Plus, Pencil, Trash2, FolderOpen, Upload, Image, Video,
  MoveRight, X, FolderPlus, Check, Loader2
} from "lucide-react";
import { apiFetch, useAuth, API_URL } from "../Admin";
import {
  Modal, Field, Input, Textarea, ConfirmDialog,
  PageLoading, PageError, ActionBtn,
} from "./AdminComponents";

interface Folder {
  id: number; name: string; description: string;
  cover_image: string | null; cover_url: string | null;
  item_count: number; sort_order: number; is_active: boolean;
}
interface GalleryItem {
  id: number; folder_id: number | null; title: string | null;
  file_path: string; file_name: string; file_type: "image" | "video";
  file_url: string; created_at: string;
}

// ─── FolderModal ─────────────────────────────────────────
function FolderModal({ open, onClose, editing, onSaved }: {
  open: boolean; onClose: () => void;
  editing: Folder | null; onSaved: () => void;
}) {
  const { token } = useAuth();
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [order, setOrder] = useState(0);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    if (editing) { setName(editing.name); setDesc(editing.description ?? ""); setOrder(editing.sort_order); }
    else { setName(""); setDesc(""); setOrder(0); }
    setErr("");
  }, [editing, open]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) { setErr("Nama folder wajib diisi"); return; }
    setSaving(true); setErr("");
    try {
      const body = { name, description: desc, sort_order: order };
      if (editing) {
        await apiFetch(`/api-gallery-folders.php?id=${editing.id}`, { method: "PUT", body: JSON.stringify(body) }, token);
      } else {
        await apiFetch("/api-gallery-folders.php", { method: "POST", body: JSON.stringify(body) }, token);
      }
      onSaved(); onClose();
    } catch (e: any) { setErr(e.message); }
    finally { setSaving(false); }
  };

  return (
    <Modal open={open} onClose={onClose} title={editing ? "Edit Folder" : "Buat Folder Baru"} size="sm">
      <form onSubmit={handleSave} className="p-6 space-y-4">
        <Field label="Nama Folder" required>
          <Input value={name} onChange={e => setName(e.target.value)} placeholder="Armada Kapal" />
        </Field>
        <Field label="Deskripsi (opsional)">
          <Textarea value={desc} onChange={e => setDesc(e.target.value)} rows={2} placeholder="Keterangan folder ini..." />
        </Field>
        <Field label="Urutan">
          <Input type="number" value={order} onChange={e => setOrder(+e.target.value)} />
        </Field>
        {err && <p className="text-red-400 text-sm">{err}</p>}
        <div className="flex gap-3 justify-end">
          <ActionBtn type="button" variant="ghost" onClick={onClose}>Batal</ActionBtn>
          <ActionBtn type="submit" variant="primary" disabled={saving}>
            {saving ? "Menyimpan..." : (editing ? "Simpan" : "Buat Folder")}
          </ActionBtn>
        </div>
      </form>
    </Modal>
  );
}

// ─── MoveModal ────────────────────────────────────────────
function MoveModal({ open, onClose, selectedIds, folders, onMoved }: {
  open: boolean; onClose: () => void;
  selectedIds: number[]; folders: Folder[]; onMoved: () => void;
}) {
  const { token } = useAuth();
  const [target, setTarget] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);

  const handleMove = async () => {
    setSaving(true);
    try {
      await apiFetch("/api-gallery-items.php", {
        method: "PUT",
        body: JSON.stringify({ ids: selectedIds, folder_id: target }),
      }, token);
      onMoved(); onClose();
    } catch (e: any) { alert(e.message); }
    finally { setSaving(false); }
  };

  return (
    <Modal open={open} onClose={onClose} title={`Pindah ${selectedIds.length} item`} size="sm">
      <div className="p-6 space-y-4">
        <p className="text-slate-400 text-sm">Pilih folder tujuan:</p>
        <div className="space-y-2">
          {/* "Semua / Tanpa Folder" — admin tetap bisa pindah ke unassigned */}
          <button
            onClick={() => setTarget(null)}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition flex items-center gap-2
              ${target === null ? "bg-blue-600 text-white" : "bg-slate-700 hover:bg-slate-600 text-slate-300"}`}
          >
            <FolderOpen className="w-4 h-4" /> Tanpa Folder (tampil di Semua)
          </button>
          {folders.map(f => (
            <button
              key={f.id} onClick={() => setTarget(f.id)}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition flex items-center gap-2
                ${target === f.id ? "bg-blue-600 text-white" : "bg-slate-700 hover:bg-slate-600 text-slate-300"}`}
            >
              <FolderOpen className="w-4 h-4" /> {f.name}
              <span className={`ml-auto text-xs ${target === f.id ? "text-blue-200" : "text-slate-500"}`}>
                {f.item_count} item
              </span>
            </button>
          ))}
        </div>
        <div className="flex gap-3 justify-end">
          <ActionBtn type="button" variant="ghost" onClick={onClose}>Batal</ActionBtn>
          <ActionBtn type="button" variant="primary" onClick={handleMove} disabled={saving}>
            <span className="flex items-center gap-2">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <MoveRight className="w-4 h-4" />}
              Pindah
            </span>
          </ActionBtn>
        </div>
      </div>
    </Modal>
  );
}

// ─── UploadZone ───────────────────────────────────────────
function UploadZone({ folderId, onUploaded }: { folderId: number | null; onUploaded: () => void }) {
  const { token } = useAuth();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [err, setErr] = useState("");

  const handleFiles = async (files: FileList) => {
    setUploading(true); setErr("");
    let done = 0;
    for (const file of Array.from(files)) {
      const form = new FormData();
      form.append("file", file);
      try {
        const res = await fetch(`${API_URL}/api-upload.php?type=gallery`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: form,
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        await apiFetch("/api-gallery-items.php", {
          method: "POST",
          body: JSON.stringify({
            folder_id: folderId,
            title: file.name.replace(/\.[^.]+$/, ""),
            file_path: data.file_path, file_name: data.file_name,
            file_type: data.file_type, file_size: data.file_size,
          }),
        }, token);
      } catch (e: any) { setErr(e.message); }
      done++;
      setProgress(Math.round((done / files.length) * 100));
    }
    setUploading(false); setProgress(0); onUploaded();
  };

  return (
    <div>
      <div
        onDrop={e => { e.preventDefault(); if (e.dataTransfer.files.length) handleFiles(e.dataTransfer.files); }}
        onDragOver={e => e.preventDefault()}
        onClick={() => inputRef.current?.click()}
        className="relative flex flex-col items-center justify-center w-full h-32 rounded-xl border-2 border-dashed border-slate-600 hover:border-blue-500 bg-slate-800/50 cursor-pointer transition group"
      >
        {uploading ? (
          <div className="text-center">
            <Loader2 className="w-6 h-6 animate-spin text-blue-400 mx-auto mb-2" />
            <p className="text-sm text-slate-400">Mengupload... {progress}%</p>
          </div>
        ) : (
          <div className="text-center">
            <Upload className="w-6 h-6 text-slate-500 group-hover:text-blue-400 mx-auto mb-2 transition" />
            <p className="text-sm text-slate-400">Drag & drop atau klik untuk upload</p>
            <p className="text-xs text-slate-500 mt-1">JPG, PNG, WebP, MP4 — bisa multiple file</p>
          </div>
        )}
        <input ref={inputRef} type="file" className="hidden"
          accept="image/*,video/mp4,video/webm" multiple
          onChange={e => e.target.files && handleFiles(e.target.files)} />
      </div>
      {err && <p className="text-red-400 text-xs mt-1">{err}</p>}
    </div>
  );
}

// ─── Main GalleryAdmin ────────────────────────────────────
export default function GalleryAdmin() {
  const { token } = useAuth();
  const [folders, setFolders] = useState<Folder[]>([]);
  const [totalAll, setTotalAll] = useState(0);
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [activeFolder, setActiveFolder] = useState<number | null>(null);
  const [loadingFolders, setLF] = useState(true);
  const [loadingItems, setLI] = useState(false);
  const [foldersErr, setFE] = useState("");
  const [itemsErr, setIE] = useState("");
  const [folderModal, setFolderModal] = useState(false);
  const [editingFolder, setEF] = useState<Folder | null>(null);
  const [delFolderId, setDelFId] = useState<number | null>(null);
  const [delFolderLoading, setDFL] = useState(false);
  const [selected, setSelected] = useState<number[]>([]);
  const [moveModal, setMoveModal] = useState(false);
  const [delItemId, setDelItemId] = useState<number | null>(null);
  const [delItemLoading, setDIL] = useState(false);

  // ── Load folders (response baru: { folders, total_all }) ──
  const loadFolders = useCallback(async () => {
    setLF(true); setFE("");
    try {
      const data = await apiFetch("/api-gallery-folders.php?all=1", {}, token);
      setFolders(data.folders ?? []);
      setTotalAll(data.total_all ?? 0);
    } catch (e: any) { setFE(e.message); }
    finally { setLF(false); }
  }, [token]);

  // ── Load items ─────────────────────────────────────────
  const loadItems = useCallback(async () => {
    setLI(true); setIE(""); setSelected([]);
    try {
      // null → semua, angka → by folder (termasuk unassigned jika folder tidak ada)
      const qs = activeFolder === null ? "?all=1" : `?folder_id=${activeFolder}`;
      const data = await apiFetch(`/api-gallery-items.php${qs}`, {}, token);
      setItems(data);
    } catch (e: any) { setIE(e.message); }
    finally { setLI(false); }
  }, [token, activeFolder]);

  useEffect(() => { loadFolders(); }, [loadFolders]);
  useEffect(() => { loadItems(); }, [loadItems]);

  const toggleSelect = (id: number) =>
    setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);

  const handleDeleteFolder = async () => {
    if (!delFolderId) return;
    setDFL(true);
    try {
      await apiFetch(`/api-gallery-folders.php?id=${delFolderId}`, { method: "DELETE" }, token);
      setDelFId(null); loadFolders(); loadItems();
    } catch (e: any) { alert(e.message); }
    finally { setDFL(false); }
  };

  const handleDeleteItem = async () => {
    if (!delItemId) return;
    setDIL(true);
    try {
      await apiFetch(`/api-gallery-items.php?id=${delItemId}`, { method: "DELETE" }, token);
      setDelItemId(null); loadItems(); loadFolders();
    } catch (e: any) { alert(e.message); }
    finally { setDIL(false); }
  };

  if (loadingFolders) return <PageLoading />;
  if (foldersErr) return <PageError message={foldersErr} onRetry={loadFolders} />;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">Galeri</h2>
          <p className="text-sm text-slate-400">
            {folders.length} folder · {totalAll} foto/video
          </p>
        </div>
        <ActionBtn variant="primary" onClick={() => { setEF(null); setFolderModal(true); }}>
          <span className="flex items-center gap-2"><FolderPlus className="w-4 h-4" /> Buat Folder</span>
        </ActionBtn>
      </div>

      <div className="flex gap-4 flex-col lg:flex-row">

        {/* ── Sidebar ── */}
        <div className="lg:w-56 flex-shrink-0 space-y-1">
          <p className="text-xs text-slate-500 uppercase tracking-wide px-1 mb-2">Folder</p>

          {/* Semua — menampilkan totalAll yang benar */}
          <button
            onClick={() => setActiveFolder(null)}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm transition
              ${activeFolder === null ? "bg-blue-600 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}
          >
            <Image className="w-4 h-4 flex-shrink-0" />
            <span className="truncate flex-1 text-left">Semua</span>
            <span className={`text-xs flex-shrink-0 ${activeFolder === null ? "text-blue-200" : "text-slate-600"}`}>
              {totalAll}
            </span>
          </button>

          {/* Per Folder */}
          {folders.map(folder => (
            <div key={folder.id} className="group relative">
              <button
                onClick={() => setActiveFolder(folder.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm transition group/item
                  ${activeFolder === folder.id ? "bg-blue-600 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}
              >
                <FolderOpen className="w-4 h-4 flex-shrink-0" />
                <span className="truncate flex-1 text-left">{folder.name}</span>
                <span className={`text-xs flex-shrink-0 ${activeFolder === folder.id ? "hidden" : "text-slate-600"} group-hover/item:hidden`}>
                  {folder.item_count}
                </span>
              </button>
              <div className={`absolute right-1 top-1/2 -translate-y-1/2 hidden group-hover:flex gap-1 ${activeFolder === folder.id ? "!flex" : ""}`}>
                <button onClick={e => { e.stopPropagation(); setEF(folder); setFolderModal(true); }}
                  className="p-1 rounded bg-slate-700 hover:bg-slate-600 text-slate-300">
                  <Pencil className="w-3 h-3" />
                </button>
                <button onClick={e => { e.stopPropagation(); setDelFId(folder.id); }}
                  className="p-1 rounded bg-red-900/40 hover:bg-red-900/70 text-red-400">
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ── Items Area ── */}
        <div className="flex-1 min-w-0 space-y-3">
          <UploadZone
            folderId={activeFolder}
            onUploaded={() => { loadItems(); loadFolders(); }}
          />

          {selected.length > 0 && (
            <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-blue-600/20 border border-blue-500/30">
              <span className="text-sm text-blue-300 font-medium">{selected.length} item dipilih</span>
              <ActionBtn variant="ghost" onClick={() => setMoveModal(true)} className="ml-auto">
                <span className="flex items-center gap-1.5 text-blue-300">
                  <MoveRight className="w-4 h-4" /> Pindah ke Folder
                </span>
              </ActionBtn>
              <ActionBtn variant="ghost" onClick={() => setSelected([])}>
                <X className="w-4 h-4 text-slate-400" />
              </ActionBtn>
            </div>
          )}

          {loadingItems ? (
            <div className="flex justify-center py-12"><Loader2 className="w-7 h-7 animate-spin text-blue-400" /></div>
          ) : itemsErr ? (
            <PageError message={itemsErr} onRetry={loadItems} />
          ) : items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-slate-500">
              <Image className="w-10 h-10 mb-3" />
              <p className="text-sm">
                {activeFolder === null
                  ? "Belum ada foto. Klik atau drag & drop untuk upload."
                  : "Folder ini kosong. Upload foto di atas."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
              {items.map(item => {
                const isSel = selected.includes(item.id);
                return (
                  <div key={item.id}
                    className={`relative aspect-square rounded-xl overflow-hidden cursor-pointer border-2 transition group
                      ${isSel ? "border-blue-500" : "border-transparent hover:border-slate-600"}`}
                    onClick={() => toggleSelect(item.id)}
                  >
                    {item.file_type === "video"
                      ? <video src={item.file_url} className="w-full h-full object-cover" muted />
                      : <img src={item.file_url} alt={item.title ?? ""} className="w-full h-full object-cover" loading="lazy" />
                    }
                    {item.file_type === "video" && (
                      <span className="absolute top-1 left-1 text-xs bg-black/60 text-white px-1.5 py-0.5 rounded flex items-center gap-1">
                        <Video className="w-3 h-3" /> Video
                      </span>
                    )}
                    <div className={`absolute top-1 right-1 w-5 h-5 rounded-full border-2 flex items-center justify-center transition
                      ${isSel ? "bg-blue-500 border-blue-500" : "bg-black/30 border-white/60 opacity-0 group-hover:opacity-100"}`}>
                      {isSel && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <button
                      onClick={e => { e.stopPropagation(); setDelItemId(item.id); }}
                      className="absolute bottom-1 right-1 p-1 rounded-lg bg-red-600/80 hover:bg-red-600 text-white opacity-0 group-hover:opacity-100 transition"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <FolderModal open={folderModal} onClose={() => setFolderModal(false)}
        editing={editingFolder} onSaved={loadFolders} />
      <MoveModal open={moveModal} onClose={() => setMoveModal(false)}
        selectedIds={selected} folders={folders}
        onMoved={() => { loadItems(); loadFolders(); setSelected([]); }} />
      <ConfirmDialog open={!!delFolderId} onClose={() => setDelFId(null)}
        onConfirm={handleDeleteFolder} loading={delFolderLoading}
        message="Yakin hapus folder ini? Foto-foto di dalamnya tidak ikut terhapus, hanya dipindah ke Semua." />
      <ConfirmDialog open={!!delItemId} onClose={() => setDelItemId(null)}
        onConfirm={handleDeleteItem} loading={delItemLoading}
        message="Yakin hapus foto/video ini? File juga akan dihapus dari server." />
    </div>
  );
}