import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { Users, UserPlus, RefreshCw, Mail, Phone, CheckCircle, AlertCircle } from 'lucide-react';

export default function App() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [message, setMessage] = useState(null);

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('members')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMembers(data || []);
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);

    try {
      const { data, error } = await supabase
        .from('members')
        .insert([
          {
            name: formData.name.trim(),
            email: formData.email.trim(),
            phone: formData.phone.trim(),
          },
        ])
        .select();

      if (error) throw error;

      setMessage({ type: 'success', text: '회원 등록이 완료되었습니다!' });
      setFormData({ name: '', email: '', phone: '' });
      fetchMembers();
    } catch (err) {
      setMessage({
        type: 'error',
        text: err.message || '등록 중 오류가 발생했습니다.',
      });
    } finally {
      setSubmitting(false);
      setTimeout(() => {
        setMessage((prev) => (prev?.type === 'success' ? null : prev));
      }, 3500);
    }
  };

  const formatDate = (isoStr) => {
    if (!isoStr) return '';
    const d = new Date(isoStr);
    return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
  };

  return (
    <div className="container">
      <header className="header">
        <h1>
          <Users size={30} color="#2563eb" />
          AISC 회원 관리 시스템
        </h1>
        <p>Supabase 클라우드 데이터베이스와 실시간 연동되는 회원 등록 서비스</p>
        <div className="status-badge">
          <span className="dot"></span>
          <span>Supabase DB Connected</span>
        </div>
      </header>

      <main className="grid-layout">
        {/* 회원 등록 폼 */}
        <section className="card">
          <h2 className="card-title">
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <UserPlus size={18} color="#2563eb" />
              신규 회원 등록
            </span>
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">이름 *</label>
              <input
                id="name"
                name="name"
                type="text"
                className="form-control"
                placeholder="홍길동"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">이메일 *</label>
              <input
                id="email"
                name="email"
                type="email"
                className="form-control"
                placeholder="example@aisc.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">전화번호 *</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                className="form-control"
                placeholder="010-1234-5678"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn-primary" disabled={submitting}>
              {submitting ? '등록 처리 중...' : '회원 등록하기'}
            </button>
          </form>

          {message && (
            <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-error'}`} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {message.type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
              <span>{message.text}</span>
            </div>
          )}
        </section>

        {/* 회원 목록 */}
        <section className="card">
          <h2 className="card-title">
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Users size={18} color="#2563eb" />
              등록된 회원 목록 ({members.length})
            </span>
            <button
              className="refresh-btn"
              onClick={fetchMembers}
              disabled={loading}
              title="새로고침"
            >
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
              <span>새로고침</span>
            </button>
          </h2>

          <div className="members-list">
            {loading && members.length === 0 ? (
              <div className="empty-state">회원 목록을 불러오는 중...</div>
            ) : members.length === 0 ? (
              <div className="empty-state">등록된 회원이 없습니다.</div>
            ) : (
              members.map((member) => (
                <div key={member.id} className="member-item">
                  <div className="member-header">
                    <span className="member-name">{member.name}</span>
                    <span className="member-date">{formatDate(member.created_at)}</span>
                  </div>
                  <div className="member-detail">
                    <Mail size={13} color="#64748b" />
                    <span>{member.email}</span>
                  </div>
                  <div className="member-detail">
                    <Phone size={13} color="#64748b" />
                    <span>{member.phone || '-'}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

