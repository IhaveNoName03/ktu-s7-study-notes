import os, re, glob
from html.parser import HTMLParser

VOID = {'area','base','br','col','embed','hr','img','input','link','meta',
        'param','source','track','wbr'}

class Stack(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.stack = []
        self.errors = []
    def handle_starttag(self, tag, attrs):
        if tag in VOID: return
        self.stack.append((tag, self.getpos()[0]))
    def handle_startendtag(self, tag, attrs):
        pass  # self-closing, ignored
    def handle_endtag(self, tag):
        if tag in VOID: return
        # pop matching
        for i in range(len(self.stack)-1, -1, -1):
            if self.stack[i][0] == tag:
                # anything above is implicitly closed
                if i != len(self.stack)-1:
                    for j in range(len(self.stack)-1, i, -1):
                        self.errors.append(f"implicitly closed <{self.stack[j][0]}> at line {self.stack[j][1]} before </{tag}>")
                    del self.stack[i+1:]
                else:
                    del self.stack[i:]
                return
        self.errors.append(f"stray </{tag}> at line {self.getpos()[0]} (no opener)")

def check_file(path):
    with open(path, encoding='utf-8') as f:
        data = f.read()
    p = Stack()
    p.feed(data)
    leftover = p.stack
    return p.errors, leftover

ROOT = os.path.dirname(os.path.abspath(__file__))
html_files = sorted(glob.glob(os.path.join(ROOT, '**', '*.html'), recursive=True))

print("=== TAG-STACK / WELL-FORMEDNESS ===")
all_ok = True
for hf in html_files:
    errs, leftover = check_file(hf)
    rel = os.path.relpath(hf, ROOT)
    if errs or leftover:
        all_ok = False
        print(f"[ISSUE] {rel}")
        for e in errs: print("   ", e)
        if leftover:
            print("    unclosed at end:", [(t,l) for t,l in leftover])
    else:
        print(f"[ok] {rel}")
print("\nWELL-FORMED ALL OK:" , all_ok)

print("\n=== DEAD-LINK + COUNT CHECK ===")
# For each folder, count html and validate index links
folders = {}
for hf in html_files:
    d = os.path.dirname(hf)
    folders.setdefault(d, []).append(hf)

for d, files in folders.items():
    idx = os.path.join(d, 'index.html')
    if not os.path.exists(idx): 
        continue
    with open(idx, encoding='utf-8') as f:
        data = f.read()
    links = re.findall(r'href="([^"#][^"]*)"', data)
    links = [l for l in links if not l.startswith('http') and not l.startswith('mailto')]
    dead = []
    for l in links:
        target = os.path.normpath(os.path.join(d, l))
        if not os.path.exists(target):
            dead.append(l)
    rel = os.path.relpath(d, ROOT)
    n = len([x for x in files if os.path.basename(x) != 'index.html']) + 1
    print(f"{rel}: {len(files)} html files | dead links: {dead if dead else 'none'}")
