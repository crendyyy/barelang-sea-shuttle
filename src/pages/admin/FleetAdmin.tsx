import { useState, useEffect, useCallback } from "react";
import { Plus, Pencil, Trash2, Ship, GripVertical } from "lucide-react";
import { apiFetch, useAuth, API_URL } from "../Admin";
import {
  Modal, Field, Input, Textarea, Toggle, TagInput,
  ImageUploader, ConfirmDialog, PageLoading, PageError,
  ActionBtn, Table, Badge
} from "./AdminComponents";

interface FleetItem {
  id: number;
  name: string;
  capacity: string;
  price: string;
  price_per_mile: string;
  description: string;
  features: string[];
  image_path: string | null;
  image_url: string | null;
  sort_order: number;
  is_active: number;
}

const EMPTY: Omit<FleetItem, "id"> = {
  name: "", capacity: "", price: "", price_per_mile: "",
  description: "", features: [], image_path: null, image_url: null,
  sort_order: 0, is_active: 1,
};

export default function FleetAdmin() {
  const { token } = useAuth();
  const [items, setItems] = useState<FleetItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModal] = useState(false);
  const [editing, setEditing] = useState<FleetItem | null>(null);
  const [form, setForm] = useState<Omit<FleetItem, "id">>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [saveErr, setSaveErr] = useState("");
  const [delId, setDelId] = useState<number | null>(null);
  const [deleting, setDel] = useState(false);

  const load = useCallback(async () => {
    setLoading(true); setError("");
    try {
      const data = await apiFetch("/api-fleet-crud.php", {}, token);
      setItems(data);
    } catch (e: any) { setError(e.message); }
    finally { setLoading(false); }
  }, [token]);

  useEffect(() => { load(); }, [load]);

  const openAdd = () => {
    setEditing(null);
    setForm(EMPTY);
    setSaveErr("");
    setModal(true);
  };

  const openEdit = (item: FleetItem) => {
    setEditing(item);
    setForm({
      name: item.name, capacity: item.capacity, price: item.price,
      price_per_mile: item.price_per_mile, description: item.description,
      features: item.features ?? [], image_path: item.image_path,
      image_url: item.image_url, sort_order: item.sort_order,
      is_active: item.is_active,
    });
    setSaveErr("");
    setModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) { setSaveErr("Nama kapal wajib diisi"); return; }
    setSaving(true); setSaveErr("");
    try {
      const body = { ...form, features: form.features };
      if (editing) {
        await apiFetch(`/api-fleet-crud.php?id=${editing.id}`, {
          method: "PUT", body: JSON.stringify(body),
        }, token);
      } else {
        await apiFetch("/api-fleet-crud.php", {
          method: "POST", body: JSON.stringify(body),
        }, token);
      }
      setModal(false);
      load();
    } catch (e: any) { setSaveErr(e.message); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!delId) return;
    setDel(true);
    try {
      await apiFetch(`/api-fleet-crud.php?id=${delId}`, { method: "DELETE" }, token);
      setDelId(null);
      load();
    } catch (e: any) { alert(e.message); }
    finally { setDel(false); }
  };

  if (loading) return <PageLoading />;
  if (error) return <PageError message={error} onRetry={load} />;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">Armada Kapal</h2>
          <p className="text-sm text-slate-400">{items.length} kapal terdaftar</p>
        </div>
        <ActionBtn variant="primary" onClick={openAdd}>
          <span className="flex items-center gap-2"><Plus className="w-4 h-4" /> Tambah Kapal</span>
        </ActionBtn>
      </div>

      {/* Table */}
      <Table headers={["Kapal", "Kapasitas", "Harga/Mil", "Urutan", "Status", "Aksi"]}>
        {items.map(item => (
          <tr key={item.id} className="hover:bg-slate-800/50 transition">
            <td className="px-4 py-3">
              <div className="flex items-center gap-3">
                {item.image_url ? (
                  <img src={item.image_url} alt={item.name}
                    className="w-12 h-10 object-cover rounded-lg flex-shrink-0" />
                ) : (
                  <div className="w-12 h-10 rounded-lg bg-slate-700 flex items-center justify-center flex-shrink-0">
                    <Ship className="w-5 h-5 text-slate-500" />
                  </div>
                )}
                <div>
                  <p className="font-medium text-white text-sm">{item.name}</p>
                  <p className="text-xs text-slate-400 line-clamp-1">{item.description}</p>
                </div>
              </div>
            </td>
            <td className="px-4 py-3 text-slate-300 text-sm">{item.capacity}</td>
            <td className="px-4 py-3 text-slate-300 text-sm">{item.price_per_mile}</td>
            <td className="px-4 py-3 text-slate-400 text-sm">{item.sort_order}</td>
            <td className="px-4 py-3">
              <Badge color={item.is_active ? "green" : "slate"}>
                {item.is_active ? "Aktif" : "Non-aktif"}
              </Badge>
            </td>
            <td className="px-4 py-3">
              <div className="flex items-center gap-2">
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

      {/* Add/Edit Modal */}
      <Modal open={modalOpen} onClose={() => setModal(false)}
        title={editing ? `Edit: ${editing.name}` : "Tambah Kapal"} size="lg">
        <form onSubmit={handleSave} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Nama Kapal" required>
              <Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                placeholder="Crew Boat" />
            </Field>
            <Field label="Kapasitas">
              <Input value={form.capacity} onChange={e => setForm(f => ({ ...f, capacity: e.target.value }))}
                placeholder="15 orang" />
            </Field>
          </div>

          <div className="w-full">
            <Field label="Harga per Mil" hint="Ditampilkan di kartu kapal">
              <Input value={form.price_per_mile} onChange={e => setForm(f => ({ ...f, price_per_mile: e.target.value }))}
                placeholder="Rp 400-600rb/mil" />
            </Field>
          </div>

          <Field label="Deskripsi">
            <Textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              placeholder="Deskripsi singkat tentang kapal ini..." />
          </Field>

          <Field label="Fitur / Keunggulan" hint="Tekan Enter untuk menambah item">
            <TagInput value={form.features} onChange={v => setForm(f => ({ ...f, features: v }))} />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Urutan Tampil">
              <Input type="number" value={form.sort_order}
                onChange={e => setForm(f => ({ ...f, sort_order: +e.target.value }))} />
            </Field>
            <Field label="Status">
              <div className="mt-2">
                <Toggle
                  checked={!!form.is_active}
                  onChange={v => setForm(f => ({ ...f, is_active: v ? 1 : 0 }))}
                  label={form.is_active ? "Aktif" : "Non-aktif"}
                />
              </div>
            </Field>
          </div>

          <Field label="Foto Kapal">
            <ImageUploader
              currentUrl={form.image_url}
              uploadType="fleet"
              onUploaded={(path, url) => setForm(f => ({ ...f, image_path: path, image_url: url }))}
            />
          </Field>

          {saveErr && (
            <p className="text-red-400 text-sm">{saveErr}</p>
          )}

          <div className="flex gap-3 justify-end pt-2">
            <ActionBtn type="button" variant="ghost" onClick={() => setModal(false)}>Batal</ActionBtn>
            <ActionBtn type="submit" variant="primary" disabled={saving}>
              {saving ? "Menyimpan..." : (editing ? "Simpan Perubahan" : "Tambah Kapal")}
            </ActionBtn>
          </div>
        </form>
      </Modal>

      {/* Delete Confirm */}
      <ConfirmDialog
        open={!!delId}
        onClose={() => setDelId(null)}
        onConfirm={handleDelete}
        loading={deleting}
        message="Yakin ingin menghapus kapal ini? Foto terkait juga akan dihapus."
      />
    </div>
  );
}
