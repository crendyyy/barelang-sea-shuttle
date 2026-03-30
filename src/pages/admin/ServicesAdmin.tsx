import { useState, useEffect, useCallback } from "react";
import { Plus, Pencil, Trash2, Star } from "lucide-react";
import { apiFetch, useAuth } from "../Admin";
import {
  Modal, Field, Input, Textarea, Toggle, TagInput, Select,
  ConfirmDialog, PageLoading, PageError,
  ActionBtn, Table, Badge
} from "./AdminComponents";

interface ServiceItem {
  id: number;
  title: string;
  description: string;
  features: string[];
  icon_name: string;
  is_highlight: boolean;
  sort_order: number;
  is_active: boolean;
}

const ICONS = [
  "Fish", "Waves", "Palmtree", "Package", "Sparkles",
  "Clock", "Anchor", "Ship", "Star", "Compass"
];

const EMPTY: Omit<ServiceItem, "id"> = {
  title: "", description: "", features: [], icon_name: "Star",
  is_highlight: false, sort_order: 0, is_active: true,
};

export default function ServicesAdmin() {
  const { token } = useAuth();
  const [items, setItems]     = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState("");
  const [modalOpen, setModal] = useState(false);
  const [editing, setEditing] = useState<ServiceItem | null>(null);
  const [form, setForm]       = useState<Omit<ServiceItem, "id">>(EMPTY);
  const [saving, setSaving]   = useState(false);
  const [saveErr, setSaveErr] = useState("");
  const [delId, setDelId]     = useState<number | null>(null);
  const [deleting, setDel]    = useState(false);

  const load = useCallback(async () => {
    setLoading(true); setError("");
    try {
      const data = await apiFetch("/api-services-crud.php", {}, token);
      setItems(data);
    } catch (e: any) { setError(e.message); }
    finally { setLoading(false); }
  }, [token]);

  useEffect(() => { load(); }, [load]);

  const openAdd = () => {
    setEditing(null); setForm(EMPTY); setSaveErr(""); setModal(true);
  };

  const openEdit = (item: ServiceItem) => {
    setEditing(item);
    setForm({
      title: item.title, description: item.description,
      features: item.features ?? [], icon_name: item.icon_name ?? "Star",
      is_highlight: !!item.is_highlight, sort_order: item.sort_order,
      is_active: !!item.is_active,
    });
    setSaveErr(""); setModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) { setSaveErr("Judul layanan wajib diisi"); return; }
    setSaving(true); setSaveErr("");
    try {
      const body = {
        ...form,
        is_highlight: form.is_highlight ? 1 : 0,
        is_active: form.is_active ? 1 : 0,
      };
      if (editing) {
        await apiFetch(`/api-services-crud.php?id=${editing.id}`, {
          method: "PUT", body: JSON.stringify(body),
        }, token);
      } else {
        await apiFetch("/api-services-crud.php", {
          method: "POST", body: JSON.stringify(body),
        }, token);
      }
      setModal(false); load();
    } catch (e: any) { setSaveErr(e.message); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!delId) return;
    setDel(true);
    try {
      await apiFetch(`/api-services-crud.php?id=${delId}`, { method: "DELETE" }, token);
      setDelId(null); load();
    } catch (e: any) { alert(e.message); }
    finally { setDel(false); }
  };

  if (loading) return <PageLoading />;
  if (error)   return <PageError message={error} onRetry={load} />;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">Layanan</h2>
          <p className="text-sm text-slate-400">{items.length} layanan terdaftar</p>
        </div>
        <ActionBtn variant="primary" onClick={openAdd}>
          <span className="flex items-center gap-2"><Plus className="w-4 h-4" /> Tambah Layanan</span>
        </ActionBtn>
      </div>

      <Table headers={["Layanan", "Icon", "Populer", "Urutan", "Status", "Aksi"]}>
        {items.map(item => (
          <tr key={item.id} className="hover:bg-slate-800/50 transition">
            <td className="px-4 py-3">
              <p className="font-medium text-white text-sm">{item.title}</p>
              <p className="text-xs text-slate-400 line-clamp-1">{item.description}</p>
            </td>
            <td className="px-4 py-3">
              <code className="text-xs text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded">
                {item.icon_name}
              </code>
            </td>
            <td className="px-4 py-3">
              {item.is_highlight && (
                <Badge color="yellow"><span className="flex items-center gap-1"><Star className="w-3 h-3" />Populer</span></Badge>
              )}
            </td>
            <td className="px-4 py-3 text-slate-400 text-sm">{item.sort_order}</td>
            <td className="px-4 py-3">
              <Badge color={item.is_active ? "green" : "slate"}>
                {item.is_active ? "Aktif" : "Non-aktif"}
              </Badge>
            </td>
            <td className="px-4 py-3">
              <div className="flex gap-2">
                <ActionBtn variant="edit" onClick={() => openEdit(item)}>
                  <span className="flex items-center gap-1"><Pencil className="w-3 h-3" /> Edit</span>
                </ActionBtn>
                <ActionBtn variant="delete" onClick={() => setDelId(item.id)}>
                  <span className="flex items-center gap-1"><Trash2 className="w-3 h-3" /> Hapus</span>
                </ActionBtn>
              </div>
            </td>
          </tr>
        ))}
      </Table>

      <Modal open={modalOpen} onClose={() => setModal(false)}
        title={editing ? `Edit: ${editing.title}` : "Tambah Layanan"} size="lg">
        <form onSubmit={handleSave} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Judul Layanan" required>
              <Input value={form.title}
                onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                placeholder="Trip Mancing" />
            </Field>
            <Field label="Icon" hint="Nama icon dari Lucide React">
              <Select value={form.icon_name}
                onChange={e => setForm(f => ({ ...f, icon_name: e.target.value }))}>
                {ICONS.map(icon => (
                  <option key={icon} value={icon}>{icon}</option>
                ))}
              </Select>
            </Field>
          </div>

          <Field label="Deskripsi">
            <Textarea value={form.description}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              placeholder="Deskripsi singkat layanan..." />
          </Field>

          <Field label="Fitur / Keunggulan" hint="Tekan Enter untuk menambah item">
            <TagInput value={form.features}
              onChange={v => setForm(f => ({ ...f, features: v }))} />
          </Field>

          <div className="grid grid-cols-3 gap-4">
            <Field label="Urutan Tampil">
              <Input type="number" value={form.sort_order}
                onChange={e => setForm(f => ({ ...f, sort_order: +e.target.value }))} />
            </Field>
            <Field label="Tandai Populer">
              <div className="mt-2">
                <Toggle checked={form.is_highlight}
                  onChange={v => setForm(f => ({ ...f, is_highlight: v }))}
                  label={form.is_highlight ? "Populer" : "Biasa"} />
              </div>
            </Field>
            <Field label="Status">
              <div className="mt-2">
                <Toggle checked={form.is_active}
                  onChange={v => setForm(f => ({ ...f, is_active: v }))}
                  label={form.is_active ? "Aktif" : "Non-aktif"} />
              </div>
            </Field>
          </div>

          {saveErr && <p className="text-red-400 text-sm">{saveErr}</p>}

          <div className="flex gap-3 justify-end pt-2">
            <ActionBtn type="button" variant="ghost" onClick={() => setModal(false)}>Batal</ActionBtn>
            <ActionBtn type="submit" variant="primary" disabled={saving}>
              {saving ? "Menyimpan..." : (editing ? "Simpan Perubahan" : "Tambah Layanan")}
            </ActionBtn>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        open={!!delId} onClose={() => setDelId(null)}
        onConfirm={handleDelete} loading={deleting}
        message="Yakin ingin menghapus layanan ini?" />
    </div>
  );
}
