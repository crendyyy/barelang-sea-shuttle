import { useState, useEffect, useCallback } from "react";
import { Save, Mail, MapPin, MessageCircle, Instagram, Facebook, Loader2 } from "lucide-react";
import { apiFetch, useAuth } from "../Admin";
import { Field, Input, PageLoading, PageError, ActionBtn } from "./AdminComponents";

interface ContactSettings {
  whatsapp_number: string;
  whatsapp_display: string;
  phone: string;
  email: string;
  address: string;
  instagram_handle: string;
  instagram_url: string;
  facebook_name: string;
  facebook_url: string;
  tiktok_handle: string;
  tiktok_url: string;
  youtube_name: string;
  youtube_url: string;
}

const EMPTY: ContactSettings = {
  whatsapp_number: "", whatsapp_display: "", phone: "",
  email: "", address: "",
  instagram_handle: "", instagram_url: "",
  facebook_name: "", facebook_url: "",
  tiktok_handle: "", tiktok_url: "",
  youtube_name: "", youtube_url: "",
};

// Icon TikTok (SVG karena tidak ada di Lucide)
const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z" />
  </svg>
);

// Icon YouTube (SVG)
const YouTubeIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

export default function ContactAdmin() {
  const { token } = useAuth();
  const [form, setForm] = useState<ContactSettings>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [saveErr, setSaveErr] = useState("");

  const load = useCallback(async () => {
    setLoading(true); setError("");
    try {
      const data = await apiFetch("/api-contact.php", {}, token);
      setForm({ ...EMPTY, ...data });
    } catch (e: any) { setError(e.message); }
    finally { setLoading(false); }
  }, [token]);

  useEffect(() => { load(); }, [load]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true); setSaveErr(""); setSuccess(false);
    try {
      await apiFetch("/api-contact.php", {
        method: "PUT", body: JSON.stringify(form),
      }, token);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (e: any) { setSaveErr(e.message); }
    finally { setSaving(false); }
  };

  const set = (key: keyof ContactSettings) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm(f => ({ ...f, [key]: e.target.value }));

  if (loading) return <PageLoading />;
  if (error) return <PageError message={error} onRetry={load} />;

  return (
    <div className="max-w-2xl space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-white">Pengaturan Kontak</h2>
        <p className="text-sm text-slate-400">Update informasi kontak yang tampil di website</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">

        {/* WhatsApp & Telepon */}
        <div className="bg-slate-800 rounded-xl p-5 border border-slate-700 space-y-4">
          <div className="flex items-center gap-2 mb-1">
            <MessageCircle className="w-4 h-4 text-green-400" />
            <h3 className="font-medium text-white text-sm">WhatsApp & Telepon</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Nomor WhatsApp (format internasional)" hint="Contoh: 6281534475202">
              <Input value={form.whatsapp_number} onChange={set("whatsapp_number")}
                placeholder="6281534475202" />
            </Field>
            <Field label="Tampilan Nomor WA" hint="Yang ditampilkan ke pengunjung">
              <Input value={form.whatsapp_display} onChange={set("whatsapp_display")}
                placeholder="081534475202" />
            </Field>
          </div>
          <Field label="Nomor Telepon">
            <Input value={form.phone} onChange={set("phone")} placeholder="081534475202" />
          </Field>
        </div>

        {/* Email & Alamat */}
        <div className="bg-slate-800 rounded-xl p-5 border border-slate-700 space-y-4">
          <div className="flex items-center gap-2 mb-1">
            <Mail className="w-4 h-4 text-red-400" />
            <h3 className="font-medium text-white text-sm">Email & Alamat</h3>
          </div>
          <Field label="Email">
            <Input type="email" value={form.email} onChange={set("email")}
              placeholder="rentalboatbatam@gmail.com" />
          </Field>
          <Field label="Alamat">
            <Input value={form.address} onChange={set("address")}
              placeholder="Tanjung Riau, Barelang & Punggur, Batam" />
          </Field>
        </div>

        {/* Media Sosial */}
        <div className="bg-slate-800 rounded-xl p-5 border border-slate-700 space-y-4">
          <div className="flex items-center gap-2 mb-1">
            <Instagram className="w-4 h-4 text-pink-400" />
            <h3 className="font-medium text-white text-sm">Media Sosial</h3>
          </div>

          {/* Instagram */}
          <div className="grid grid-cols-2 gap-4">
            <Field label="Instagram Handle">
              <Input value={form.instagram_handle} onChange={set("instagram_handle")}
                placeholder="@rentalboatbatam" />
            </Field>
            <Field label="URL Instagram">
              <Input value={form.instagram_url} onChange={set("instagram_url")}
                placeholder="https://instagram.com/rentalboatbatam" />
            </Field>
          </div>

          {/* Facebook */}
          <div className="grid grid-cols-2 gap-4">
            <Field label="Nama Facebook">
              <Input value={form.facebook_name} onChange={set("facebook_name")}
                placeholder="Rental Boat Batam" />
            </Field>
            <Field label="URL Facebook">
              <Input value={form.facebook_url} onChange={set("facebook_url")}
                placeholder="https://facebook.com/rentalboatbatam" />
            </Field>
          </div>

          {/* TikTok */}
          <div className="grid grid-cols-2 gap-4">
            <Field label="TikTok Handle">
              <Input value={form.tiktok_handle} onChange={set("tiktok_handle")}
                placeholder="@rentalboatbatam" />
            </Field>
            <Field label="URL TikTok">
              <Input value={form.tiktok_url} onChange={set("tiktok_url")}
                placeholder="https://tiktok.com/@rentalboatbatam" />
            </Field>
          </div>

          {/* YouTube */}
          <div className="grid grid-cols-2 gap-4">
            <Field label="Nama Channel YouTube">
              <Input value={form.youtube_name} onChange={set("youtube_name")}
                placeholder="Rental Boat Batam" />
            </Field>
            <Field label="URL YouTube">
              <Input value={form.youtube_url} onChange={set("youtube_url")}
                placeholder="https://youtube.com/@rentalboatbatam" />
            </Field>
          </div>
        </div>

        {saveErr && <p className="text-red-400 text-sm">{saveErr}</p>}
        {success && <p className="text-green-400 text-sm">✓ Perubahan berhasil disimpan!</p>}

        <div className="flex justify-end">
          <ActionBtn type="submit" variant="primary" disabled={saving}>
            <span className="flex items-center gap-2">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {saving ? "Menyimpan..." : "Simpan Perubahan"}
            </span>
          </ActionBtn>
        </div>
      </form>
    </div>
  );
}