using UnityEngine;
using System.Collections;

//移動するオブジェクトのAbstractクラス
public abstract class MovingObject : MonoBehaviour
{
    public float moveTime = 0.1f;           //移動にかかる秒数
    public LayerMask blockingLayer;         //ブロッキングレイヤー
    
    
    private BoxCollider2D boxCollider;      //The BoxCollider2D component attached to this object.
    private Rigidbody2D rb2D;               //The Rigidbody2D component attached to this object.
    private float inverseMoveTime;          //移動にかかる秒数の逆数


    //Protected, virtual functions can be overridden by inheriting classes.
    protected virtual void Start ()
    {
        //初期化
        boxCollider = GetComponent <BoxCollider2D> ();
        rb2D = GetComponent <Rigidbody2D> ();
        inverseMoveTime = 1f / moveTime;
    }
    
    
    //移動する。移動できないかもしれない
    protected bool Move (int xDir, int yDir, out RaycastHit2D hit)
    {
        //初期位置
        Vector2 start = transform.position;
        
        // 目的位置
        Vector2 end = start + new Vector2 (xDir, yDir);
        
        //衝突判定に自分自身が引っかからないように一時的に無効化
        boxCollider.enabled = false;
        
        //startからendまで障害物が無いか判定
        hit = Physics2D.Linecast (start, end, blockingLayer);

        //衝突判定に自分自身が引っかからないように一時的に無効化...を戻す
        boxCollider.enabled = true;
        
        //ヒットテスト
        if(hit.transform == null)
        {
            //移動する。
            // StartCoroutine -> コルーチンを実行
            StartCoroutine(SmoothMovement (end));
            return true;
        }
        return false;
    }
    
    
    //1フレームごとに移動するコルーチン
    protected IEnumerator SmoothMovement (Vector3 end)
    {
        //直線距離を求める
        float sqrRemainingDistance = (transform.position - end).sqrMagnitude;

        //限りなくゼロに近づくまでループ。
        //浮動小数点数誤差による無限ループを避けるため、Epsilonを利用
        while (sqrRemainingDistance > float.Epsilon)
        {
            // 1フレーム後の位置を求める。
            Vector3 newPostion = Vector3.MoveTowards(rb2D.position, end, inverseMoveTime * Time.deltaTime);
            
            //移動する
            rb2D.MovePosition (newPostion);
            
            //距離を更新
            sqrRemainingDistance = (transform.position - end).sqrMagnitude;
            
            //次のフレームへ
            yield return null;
        }
    }
    
    
    //移動を試みる
    protected virtual void AttemptMove <T> (int xDir, int yDir)
        where T : Component
    {
        //Hit will store whatever our linecast hits when Move is called.
        RaycastHit2D hit;
        
        //Set canMove to true if Move was successful, false if failed.
        bool canMove = Move (xDir, yDir, out hit);
        
        //Check if nothing was hit by linecast
        if(hit.transform == null)
            //If nothing was hit, return and don't execute further code.
            return;
        
        //Get a component reference to the component of type T attached to the object that was hit
        T hitComponent = hit.transform.GetComponent <T> ();
        
        //If canMove is false and hitComponent is not equal to null, meaning MovingObject is blocked and has hit something it can interact with.
        if(!canMove && hitComponent != null)
            
            //Call the OnCantMove function and pass it hitComponent as a parameter.
            OnCantMove (hitComponent);
    }
    
    
    //The abstract modifier indicates that the thing being modified has a missing or incomplete implementation.
    //OnCantMove will be overriden by functions in the inheriting classes.
    protected abstract void OnCantMove <T> (T component)
        where T : Component;
}