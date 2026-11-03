import { supabase } from './supabase.js';

const registerForm = document.getElementById('registerForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const submitBtn = document.getElementById('submitBtn');
const alertBox = document.getElementById('alertBox');
const memberListEl = document.getElementById('memberList');
const memberCountEl = document.getElementById('memberCount');

// Auto format phone number
phoneInput.addEventListener('input', (e) => {
  let val = e.target.value.replace(/[^0-9]/g, '');
  if (val.length > 3 && val.length <= 7) {
    val = `${val.slice(0, 3)}-${val.slice(3)}`;
  } else if (val.length > 7) {
    val = `${val.slice(0, 3)}-${val.slice(3, 7)}-${val.slice(7, 11)}`;
  }
  e.target.value = val;
});

function showAlert(message, type = 'success') {
  alertBox.className = `alert ${type}`;
  alertBox.textContent = message;
  alertBox.style.display = 'block';

  setTimeout(() => {
    alertBox.style.display = 'none';
  }, 4000);
}

async function loadMembers() {
  memberListEl.innerHTML = '<div class="empty-state">회원 목록을 불러오는 중...</div>';
  
  try {
    const { data, error } = await supabase
      .from('members')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      memberListEl.innerHTML = `<div class="empty-state" style="color:var(--error);">목록 조회 실패: ${error.message}</div>`;
      return;
    }

    if (!data || data.length === 0) {
      memberListEl.innerHTML = '<div class="empty-state">등록된 회원이 없습니다. 첫 번째 회원을 등록해 보세요!</div>';
      memberCountEl.textContent = '0명';
      return;
    }

    memberCountEl.textContent = `${data.length}명`;

    memberListEl.innerHTML = data.map((m) => {
      const dateStr = new Date(m.created_at).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
      return `
        <div class="member-card">
          <div class="member-info">
            <h4>${escapeHtml(m.name)}</h4>
            <div class="meta">
              <span>📧 ${escapeHtml(m.email)}</span>
              <span>📞 ${escapeHtml(m.phone)}</span>
            </div>
          </div>
          <div class="member-date">${dateStr}</div>
        </div>
      `;
    }).join('');
  } catch (err) {
    memberListEl.innerHTML = `<div class="empty-state" style="color:var(--error);">오류 발생: ${err.message}</div>`;
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const phone = phoneInput.value.trim();

  if (!name || !email || !phone) {
    showAlert('모든 필드를 입력해 주세요.', 'error');
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = '등록 처리 중...';

  try {
    const { data, error } = await supabase
      .from('members')
      .insert([{ name, email, phone }]);

    if (error) {
      if (error.code === '23505') {
        showAlert('이미 등록된 이메일 주소입니다.', 'error');
      } else {
        showAlert(`등록 실패: ${error.message}`, 'error');
      }
    } else {
      showAlert('성공적으로 회원이 등록되었습니다!', 'success');
      registerForm.reset();
      loadMembers();
    }
  } catch (err) {
    showAlert(`네트워크 오류가 발생했습니다: ${err.message}`, 'error');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = '등록하기';
  }
});

// Initial load
loadMembers();
